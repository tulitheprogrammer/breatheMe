import { SessionRequest } from '../../../model/request/SessionRequest';
import { SessionGatewayImpl } from '../../../data/session/SessionGatewayImpl';
import { SessionResponseMapper } from '../../../data/SessionResponseMapper';
import { anything, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { HttpService } from '../../../data/http/HttpService';
import { HttpResponse } from '../../../data/HttpResponse';
import { ErrorResponseMapper } from '../../../domain/common/ErrorResponseMapper';
import { SessionEntity } from '../../../model/session/SessionEntity';

const responseMapper = mock(SessionResponseMapper);
const httpService = mock(HttpService);
const errorMapper = mock(ErrorResponseMapper);
const sessionEntity = mock(SessionEntity);

const subject = new SessionGatewayImpl(
  instance(responseMapper),
  instance(httpService),
  instance(errorMapper),
);

it('makes a successful create request', async () => {
  const httpResponse = mock(HttpResponse);
  const sessionRequest = instance(mock(SessionRequest));

  when(httpService.makeSignedRequest(sessionRequest)).thenResolve(
    instance(httpResponse),
  );

  await subject.createSession(sessionRequest);
  verify(responseMapper.parseSessionEntity(instance(httpResponse))).once();
});

it('gets all sessions of user correctly', async () => {
  const httpResponse = instance(mock(HttpResponse));
  const searchRequest = new SessionRequest(
    undefined,
    undefined,
    undefined,
    '/session/search',
    'GET',
  );
  when(httpService.makeSignedRequest(anything())).thenResolve(httpResponse);
  const expected = [instance(sessionEntity), instance(sessionEntity)];

  when(responseMapper.parseSessionEntityArray(httpResponse)).thenReturn(
    expected,
  );
  const result = await subject.getAllSessions();
  expect(result).toEqual(expected);
});
