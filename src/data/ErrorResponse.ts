import { Response } from '../model/response/Response';

export class ErrorResponse implements Response {
  constructor(public readonly message: string, public readonly code: number) {}
}
