import { InMemoryRepository } from '../../domain/UserRepository';
import { LocalDataSourceImpl } from './LocalDataSourceImpl';
import { LocalDataSource } from './LocalDataSource';
import { Constants } from '../../utils/Constants';
import { SessionEntityMapper } from './SessionEntityMapper';
import { SessionEntity } from '../../model/session/SessionEntity';
import { SessionEntityFactory } from '../../model/session/SessionEntityFactory';
import { UUIDBuilder } from './UUIDBuilder';
import { DeviceManager } from '../../utils/DeviceManager';

export class LocalRepository implements InMemoryRepository {
  private static instance: LocalRepository;

  private constructor(
    private readonly source: LocalDataSource,
    private readonly mapper: SessionEntityMapper,
    private readonly sessionEntityFactory: SessionEntityFactory,
  ) {}

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new LocalRepository(
        new LocalDataSourceImpl(),
        new SessionEntityMapper(),
        new SessionEntityFactory(new UUIDBuilder(new DeviceManager())),
      );
    }
    return this.instance;
  }

  /**
   * Use this Method only for testing purpose
   * @param {LocalDataSource} testingDataSource
   * @param {SessionEntityMapper} sessionMapper
   * @param {SessionEntityFactory} sessionEntityFactory
   * @returns {LocalRepository}
   */
  public static makeInstance(
    testingDataSource: LocalDataSource,
    sessionMapper: SessionEntityMapper,
    sessionEntityFactory: SessionEntityFactory,
  ) {
    this.instance = new LocalRepository(
      testingDataSource,
      sessionMapper,
      sessionEntityFactory,
    );
    return this.instance;
  }

  isAuthTokenPersisted(): Promise<boolean> {
    return new Promise<boolean>((resolve, _reject) => {
      this.source
        .getItem(Constants.JWT_TOKEN_KEY)
        .then(
          result => {
            resolve(result.length > 0);
          },
          _ => {
            resolve(false);
          },
        )
        .catch(_ => {
          resolve(false);
        });
    });
  }

  getAuthToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.source
        .getItem(Constants.JWT_TOKEN_KEY)
        .then(result => {
          if (result === undefined || result.length == 0) {
            reject();
          } else {
            resolve(result);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  refreshAuthToken(token: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.source
        .setItem(Constants.JWT_TOKEN_KEY, token)
        .then(result => {
          resolve(result);
        })
        .catch(_error => {
          reject(false);
        });
    });
  }

  clearAuthToken(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, _reject) => {
      await this.refreshAuthToken('');
      resolve(true);
    });
  }

  insertSessionEntity(sessionEntity: SessionEntity): Promise<SessionEntity> {
    return new Promise<SessionEntity>(async (resolve, _reject) => {
      this.addSessionIdToMap(sessionEntity.uuid).then(_ => {
        this.source
          .setItem(sessionEntity.uuid, sessionEntity.toJSONString())
          .then(_ => {
            resolve(sessionEntity);
          });
      });
    });
  }

  public addSessionIdToMap(id: string): Promise<string> {
    return new Promise<string>((resolve, _reject) => {
      const currentPersistedIds: Array<string> = [];

      this.source.getItem(Constants.SESSION_ID_MAP).then(async result => {
        if (result != undefined && result.length > 0) {
          const currentIds: Array<string> = result.split(',');
          currentPersistedIds.push(...currentIds);
        }
        if (currentPersistedIds.indexOf(id + '') === -1) {
          currentPersistedIds.push(id + '');
        }

        const arrayString = currentPersistedIds.join();
        await this.source.setItem(Constants.SESSION_ID_MAP, arrayString);

        resolve(arrayString);
      });
    });
  }

  public removeSessionIdFromMap(id: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const result = await this.source.getItem(Constants.SESSION_ID_MAP);
      if (result != undefined && result.length > 0) {
        const currentPersistedIds = result.split(',');
        if (currentPersistedIds.indexOf(id) != -1) {
          currentPersistedIds.splice(currentPersistedIds.indexOf(id), 1);
          const arrayString =
            currentPersistedIds.length > 0
              ? currentPersistedIds.join(',')
              : undefined;
          await this.source.setItem(Constants.SESSION_ID_MAP, arrayString);
          resolve(arrayString);
        }
      }
    });
  }

  getAllPersistedSessionEntities(): Promise<Array<SessionEntity>> {
    return new Promise<Array<SessionEntity>>(async (resolve, reject) => {
      const result = [];

      await this.getPersistedSessionIds()
        .then(
          (persistedIds: Array<string>) => {
            for (const id of persistedIds) {
              this.getSessionById(id).then(session => {
                result.push(session);
              });
            }
          },
          _error => {
            reject([]);
          },
        )
        .catch(() => {
          resolve([]);
        });
      resolve(result);
    });
  }

  getPersistedSessionIds(): Promise<Array<string>> {
    return new Promise<Array<string>>((resolve, reject) => {
      this.source
        .getItem(Constants.SESSION_ID_MAP)
        .then(
          result => {
            const sessionIdArray: Array<string> = result.split(',');
            resolve(sessionIdArray);
          },
          _error => {
            reject([]);
          },
        )
        .catch(() => {
          resolve([]);
        });
    });
  }

  getSessionById(id: string): Promise<SessionEntity> {
    return new Promise<SessionEntity>((resolve, _) => {
      this.source.getItem(id).then(result => {
        const session = this.mapper.mapSession(result);
        resolve(session);
      });
    });
  }

  updateSession(session: SessionEntity): Promise<SessionEntity> {
    return this.insertSessionEntity(session);
  }

  cacheUsername(username: string): Promise<string> {
    return this.source.setItem(Constants.USERNAME_CACHE_KEY, username);
  }

  getUsername(): Promise<string> {
    return this.source.getItem(Constants.USERNAME_CACHE_KEY);
  }

  deleteSession(id: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      await this.removeSessionIdFromMap(id);
      await this.source.setItem(id, undefined);
      resolve(true);
    });
  }

  persistSession(
    amountOfRounds,
    custom,
    retentionTimeMap,
    amountOfBreathsPerRetention,
    notes,
  ): Promise<SessionEntity> {
    const entity = this.sessionEntityFactory.createFromValues(
      notes,
      amountOfBreathsPerRetention,
      retentionTimeMap,
      Date.now(),
    );
    return this.insertSessionEntity(entity);
  }
}
