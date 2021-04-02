import { AuthController, AuthState } from '../../../app/globals/AuthController';
import { deepEqual, instance, mock, when } from 'ts-mockito';
import React from 'react';
import { AuthAction } from '../../../app/globals/AuthAction';
import { ErrorResponse } from '../../../data/ErrorResponse';

const componentMock = mock(React.Component);
const authAction = mock(AuthAction);
const subject = new AuthController(
  instance(authAction),
  instance(componentMock),
);

it('has a correct initial state', () => {
  const initialState: AuthState = {
    isTokenPersisted: false,
    authenticationFailed: false,
    isAuthenticated: false,
    checkedIfTokenIsPersisted: false,
  };

  expect(subject.getInitialState()).toEqual(initialState);
});

it('signs in correctly, persists token and sets the isAuthenticated flag to true', async done => {
  const email = '1';
  const password = '1';
  const token = 'toookeeen';
  when(authAction.signIn(deepEqual(email), deepEqual(password))).thenResolve(
    token,
  );
  when(authAction.persistToken(deepEqual(token))).thenResolve(true);

  await subject.signIn(email, password);

  expect(subject.getState()).toEqual({
    ...subject.getInitialState(),
    checkedIfTokenIsPersisted: true,
    isAuthenticated: true,
    isTokenPersisted: true,
  });
  done();
});

it('authenticationFailed set to true when sign in fails', async done => {
  const email = '1';
  const password = '1';
  const error = instance(mock(ErrorResponse));
  when(authAction.signIn(email, password)).thenReject(error);

  await subject.signIn(email, password);

  expect(subject.getState()).toEqual({
    ...subject.getInitialState(),
    checkedIfTokenIsPersisted: true,
    authenticationFailed: true,
  });
  done();
});

it('has a correct state after failed sign in and then successful sign in ', async done => {
  // SIGN UP FAILS
  const email = '1';
  const password = '1';
  const error = instance(mock(ErrorResponse));
  when(authAction.signIn(email, password)).thenReject(error);

  await subject.signIn(email, password);

  expect(subject.getState()).toEqual({
    ...subject.getInitialState(),
    checkedIfTokenIsPersisted: true,
    authenticationFailed: true,
  });

  // THEN SIGN UP SUCCEEDS

  const token = 'toookeeen';
  when(authAction.signIn(deepEqual(email), deepEqual(password))).thenResolve(
    token,
  );
  when(authAction.persistToken(deepEqual(token))).thenResolve(true);

  await subject.signIn(email, password);

  expect(subject.getState()).toEqual({
    ...subject.getInitialState(),
    checkedIfTokenIsPersisted: true,
    isAuthenticated: true,
    isTokenPersisted: true,
  });
  done();
});

it('signs in correctly, fails to persist token and rejects then', async () => {
  const email = '1';
  const password = '1';
  const token = 'toookeeen';
  when(authAction.signIn(deepEqual(email), deepEqual(password))).thenResolve(
    token,
  );
  when(authAction.persistToken(token)).thenReject(new ErrorResponse('', -1));

  await subject.signIn(email, password);

  expect(subject.getState()).toEqual({
    ...subject.getInitialState(),
    checkedIfTokenIsPersisted: true,
    isAuthenticated: false,
    isTokenPersisted: false,
    authenticationFailed: true,
  });
});
