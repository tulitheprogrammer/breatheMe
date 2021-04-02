import { SessionEntity } from '../../model/session/SessionEntity';
import { SessionRequest } from '../../model/request/SessionRequest';

export interface SessionGateway {
  getSessionById(id: string): Promise<SessionEntity>;

  createSession(session: SessionRequest): Promise<SessionEntity>;

  updateSession(session: SessionRequest): Promise<SessionEntity>;

  getAllSessions(): Promise<Array<SessionEntity>>;
}
