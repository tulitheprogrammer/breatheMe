import { Entity } from '../../model/entity/Entity';
import { Response } from '../../model/response/Response';

export interface ResponseMapper<
  ENTITY extends Entity,
  RESPONSE extends Response
> {
  mapEntity(entity: ENTITY): RESPONSE;
}
