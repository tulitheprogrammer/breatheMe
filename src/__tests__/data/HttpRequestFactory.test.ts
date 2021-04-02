import { HttpRequestFactory } from '../../data/http/HttpRequestFactory';
import { instance, mock } from 'ts-mockito';
import { SessionEntity } from '../../model/session/SessionEntity';

const subject = new HttpRequestFactory();

it('it creates a correct create-session request', () => {
  const session = mock(SessionEntity);
  const result = subject.makeCreateSessionRequest(instance(session));
  expect(result.endpoint).toEqual('session/create');
  expect(result.method).toEqual('POST');
  expect(result.headers['Content-Type']).toEqual('Application/JSON');
});
