import { SessionEntity } from '../../model/session/SessionEntity';

export class SessionEntityMapper {
  mapSession(data: any): SessionEntity {
    return JSON.parse(data) as SessionEntity;
  }
}
