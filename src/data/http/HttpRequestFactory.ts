import { HttpRequest } from '../HttpRequest';
import { SessionEntity } from '../../model/session/SessionEntity';

export class HttpRequestFactory {
  makeCreateSessionRequest(session: SessionEntity): HttpRequest {
    return new HttpRequest('session/create', 'POST', session);
  }
}
