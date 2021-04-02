import { SessionEntity } from '../model/session/SessionEntity';

export class SessionResponseMapper {
  constructor() {}

  parseSessionEntity(data): SessionEntity {
    return new SessionEntity(data.uuid, data.date, data.rounds, data.notes);
  }

  public parseSessionEntityArray(data): Array<SessionEntity> {
    return data.map(session => this.parseSessionEntity(session));
  }

  private getMap(data: {}) {
    const map = new Map();
    for (const key in data) {
      map.set(Number(key), data[key]);
    }
    return map;
  }
}
