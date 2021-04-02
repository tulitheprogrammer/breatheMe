import { Entity } from '../entity/Entity';
import { RoundEntity } from './RoundEntity';

export class SessionEntity implements Entity {
  constructor(
    public readonly uuid: string,
    public date: number = Date.now(),
    public rounds: Array<RoundEntity>,
    public notes: string,
  ) {}

  static empty(): SessionEntity {
    // Use the empty construct if you would like to parse an Entity from JSON
    return new SessionEntity(undefined, undefined, undefined, undefined);
  }

  toJSONString(): string {
    return JSON.stringify(this);
  }

  fromJSONString(json: string): SessionEntity {
    return JSON.parse(json);
  }
}
