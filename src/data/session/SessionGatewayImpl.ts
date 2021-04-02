import { SessionGateway } from '../../domain/session/SessionGateway';
import { SessionEntity } from '../../model/session/SessionEntity';
import { HttpService } from '../http/HttpService';
import { SessionResponseMapper } from '../SessionResponseMapper';
import { ErrorResponseMapper } from '../../domain/common/ErrorResponseMapper';
import { SessionRequest } from '../../model/request/SessionRequest';

export class SessionGatewayImpl implements SessionGateway {
  private string;
  ENDPOINT = 'http://localhost:5000/session';

  constructor(
    private readonly sessionResponseMapper: SessionResponseMapper,
    private readonly httpService: HttpService,
    private readonly errorMapper: ErrorResponseMapper,
  ) {}

  createSession(sessionHttpRequest: SessionRequest): Promise<SessionEntity> {
    return new Promise<SessionEntity>((resolve, reject) => {
      this.httpService.makeSignedRequest(sessionHttpRequest).then(
        result => {
          const entity = this.sessionResponseMapper.parseSessionEntity(result);
          resolve(entity);
        },
        error => {
          reject(this.errorMapper.mapEntity(error));
        },
      );
    });
  }

  getAllSessions(): Promise<Array<SessionEntity>> {
    const getAllRequest = new SessionRequest(
      undefined,
      undefined,
      undefined,
      '/session/search',
      'GET',
    );
    return new Promise<Array<SessionEntity>>((resolve, reject) => {
      this.httpService.makeSignedRequest(getAllRequest).then(result => {
        resolve(this.sessionResponseMapper.parseSessionEntityArray(result));
      });
    });
  }

  getSessionById(id: string): Promise<SessionEntity> {
    return undefined;
  }

  updateSession(session: SessionRequest): Promise<SessionEntity> {
    return undefined;
  }
}
