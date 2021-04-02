import { AuthAction } from '../../../app/globals/AuthAction';
import { instance, mock, when } from 'ts-mockito';
import { AuthManagerImpl } from '../../../domain/auth/impl/AuthManagerImpl';
import { AuthResponse } from '../../../domain/auth/model/AuthResponse';
import { ErrorResponse } from '../../../data/ErrorResponse';

const authManager = mock(AuthManagerImpl);
const subject = new AuthAction(instance(authManager));

it('signs in successfully', async done => {
  const email = '';
  const pw = '';
  const token = '123';
  const authResponse = mock(AuthResponse);
  const authResponseInstance = instance(authResponse);
  when(authResponse.jwtToken).thenReturn(token);
  when(authManager.signIn(email, pw)).thenResolve(authResponseInstance);

  subject.signIn(email, pw).then(result => {
    expect(result).toEqual(token);
    done();
  });
});

it('sign in fails', async done => {
  const email = '';
  const pw = '';
  const error = instance(mock(ErrorResponse));
  when(authManager.signIn(email, pw)).thenReject(error);

  subject.signIn(email, pw).then(
    _ => {},
    errorResult => {
      expect(errorResult).toEqual(error);
      done();
    },
  );
});

it('registers successfully', async done => {
  const email = '1';
  const pw = '1';
  const displayName = 'wolf';
  const authResponse = instance(mock(AuthResponse));
  when(authManager.createAccount(email, pw, displayName)).thenResolve(
    authResponse,
  );

  subject.register(email, pw, displayName).then(result => {
    expect(result).toEqual(authResponse);
    done();
  });
});

it('registers fails', async done => {
  const email = '1';
  const pw = '1';
  const displayName = 'wolf';
  const error = instance(mock(ErrorResponse));
  when(authManager.createAccount(email, pw, displayName)).thenReject(error);

  subject.register(email, pw, displayName).then(
    () => {
      fail();
    },
    errorResult => {
      expect(errorResult).toEqual(error);
      done();
    },
  );
});

it('persists a token successfully', async done => {
  const token = '_';
  when(authManager.cacheToken(token)).thenResolve(token);
  subject.persistToken(token).then(result => {
    expect(result).toEqual(true);
    done();
  });
});

it('fails to persist a token successfully', async done => {
  const token = '_';
  const error = instance(mock(ErrorResponse));
  when(authManager.cacheToken(token)).thenReject(error);
  subject.persistToken(token).then(
    _success => {},
    errorResult => {
      expect(errorResult).toEqual(error);
      done();
    },
  );
});

it('returns true when calling isTokenPersisted', async done => {
  const responseMock = instance(mock(AuthResponse));
  when(authManager.isAuthenticated()).thenResolve(responseMock);
  subject.isTokenPersisted().then(result => {
    expect(result).toEqual(true);
    done();
  });
});

it('returns false when calling isTokenPersisted fails', async done => {
  const responseMock = instance(mock(AuthResponse));
  when(authManager.isAuthenticated()).thenReject(responseMock);
  subject.isTokenPersisted().then(result => {
    expect(result).toEqual(false);
    done();
  });
});
