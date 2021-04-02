import { Entity } from './entity/Entity';

export abstract class EntityFactory<ENTITY extends Entity> {
  abstract createFromJSON(data): ENTITY;
}
