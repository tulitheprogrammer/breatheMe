import { ErrorEntity } from '../model/entity/ErrorEntity';

export class HttpResponse {
  token: string;
  error: ErrorEntity;
  data: {};
}
