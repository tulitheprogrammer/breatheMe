import { Response } from '../../../model/response/Response';

export class AuthResponse implements Response {
  constructor(
    public readonly jwtToken: string = '',
    public readonly successful: boolean,
    public readonly errorCode?: number,
  ) {}
}
