import { AbstractRequest } from '../../../model/request/AbstractRequest';

export class AuthRequest extends AbstractRequest {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly username?: string,
  ) {
    super();
  }
}
