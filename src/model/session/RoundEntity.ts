import { Entity } from '../entity/Entity';

export class RoundEntity implements Entity {
  constructor(
    public roundOrder,
    public breathes,
    public retentionTime,
    public inhaleHoldDuration = 0,
    public totalTime = 0,
    public createdOn?,
  ) {}
}
