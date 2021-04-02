import { HomeComponentController } from '../../../app/home/HomeComponentController';
import { instance, mock, verify, when } from 'ts-mockito';
import {
  HomeComponent,
  HomeComponentState,
} from '../../../app/home/HomeComponent';
import { AuthManagerImpl } from '../../../domain/auth/impl/AuthManagerImpl';
import { LocalRepository } from '../../../data/repository/LocalRepository';
import { AuthResponse } from '../../../domain/auth/model/AuthResponse';

const component = mock(HomeComponent);
const authManager = mock(AuthManagerImpl);
const repository = mock(LocalRepository);
const componentState: HomeComponentState = {
  isProgressing: false,
  isLoggedIn: false,
  currentProgress: 0,
  currentUsername: '',
  welcomeText: '',
  currentDate: new Date(Date.now()).toString(),
};
const subject = new HomeComponentController(
  instance(component),
  instance(authManager),
  instance(repository),
);
when(component.getInitialState()).thenReturn(componentState);
it('caches token when sign up successful', async () => {
  const username = 'sandy';
  const email = 'sandra@sandra.com';
  const pw = 'martinYmindy';
  const token = '1234';
  const authResponse = new AuthResponse(token, true);

  when(authManager.createAccount(email, pw, username)).thenResolve(
    authResponse,
  );
  when(repository.refreshAuthToken(token)).thenResolve('anyhtnigsio');
  when(component.displayMessage('')).thenCall(() => {});

  await subject.signUp(email, pw, username);

  verify(repository.refreshAuthToken(token)).once();
});

it('tells the view that user is logged in when he actually is', async done => {
  when(repository.isAuthTokenPersisted()).thenResolve(true);
  when(repository.getUsername()).thenResolve('');
  when(
    component.updateState({
      ...component.getInitialState(),
      isLoggedIn: false,
      isProgressing: true,
      currentProgress: 0.1,
      currentUsername: '',
    }),
  ).thenCall(() => {});
  subject.tryAuth().then(result => {
    expect(result).toEqual(true);
    done();
  });
});
