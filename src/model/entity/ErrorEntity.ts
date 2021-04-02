import { Entity } from './Entity';

export class ErrorEntity implements Entity {
  constructor(public readonly code: number, public readonly message: string) {}
}
