import { Entity } from './Entity';

export class AuthEntity implements Entity {
  constructor(
    public readonly jwtToken?: string,
    public readonly error?: number,
  ) {}
}
