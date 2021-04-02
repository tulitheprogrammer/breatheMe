import { SessionManager } from '../SessionManager';
import { SessionGateway } from '../SessionGateway';
import { InMemoryRepository } from '../../UserRepository';
import { SessionFactory } from '../model/SessionFactory';
import { NetworkChecker } from '../../../utils/NetworkChecker';
import { AuthManager } from '../../auth/AuthManager';
import { SessionEntity } from '../../../model/session/SessionEntity';

export class SessionManagerImpl implements SessionManager {
  constructor(
    private readonly gateway: SessionGateway,
    private readonly repository: InMemoryRepository,
    private readonly networkChecker: NetworkChecker,
    private readonly sessionFactory: SessionFactory,
    private readonly authManager: AuthManager,
  ) {}

  createAndSaveSession(
    amountOfRounds: number,
    custom: boolean,
    retentionTimeMap: Map<number, number>,
    amountOfBreathsPerRetention: Map<number, number>,
    notes: string,
  ): Promise<SessionEntity> {
    return new Promise<SessionEntity>((resolve, _reject) => {
      this.repository
        .persistSession(
          amountOfRounds,
          custom,
          retentionTimeMap,
          amountOfBreathsPerRetention,
          notes,
        )
        .then(async (cachedSession: SessionEntity) => {
          const isDeviceOnline = await this.networkChecker.isDeviceConnected();
          if (isDeviceOnline) {
            // Device is connected to the internet, checking now if user is authenticated
            this.authManager.isAuthenticated().then(
              _ => {
                this.createSessionGlobal(cachedSession).then(
                  async syncedSession => {
                    await this.repository.updateSession(syncedSession);
                    resolve(syncedSession);
                  },
                  _ => {
                    resolve(cachedSession);
                  },
                );
              },
              _ => {
                resolve(cachedSession);
              },
            );
          } else {
            resolve(cachedSession);
          }
        });
    });
  }

  async getAllSessions(): Promise<Array<SessionEntity>> {
    return new Promise<Array<SessionEntity>>(async (resolve, _reject) => {
      const isDeviceOnline = await this.networkChecker.isDeviceConnected();
      const isUserAuthenticated = await this.authManager.isAuthenticated();
      if (isDeviceOnline && isUserAuthenticated) {
        this.gateway.getAllSessions().then(entities => {
          resolve(entities);
        });
      } else {
        const result = await this.repository.getAllPersistedSessionEntities();
        resolve(result);
      }
    });
  }

  getSessionById(id: number): Promise<SessionEntity> {
    id.toString();
    return undefined;
  }

  createSessionGlobal(session: SessionEntity): Promise<SessionEntity> {
    return new Promise<SessionEntity>((resolve, reject) => {
      this.gateway
        .createSession(this.sessionFactory.makeSessionRequest(session))
        .then(entity => {
          resolve(entity);
        });
    });
  }

  /*
    private async shouldLoadFromBackend(): boolean {
        const isDeviceOnline = await this.networkChecker.isDeviceConnected();
        const isUserAuthenticated = await this.controller.isAuthenticated();
        return isDeviceOnline && isUserAuthenticated;
    } */
}
