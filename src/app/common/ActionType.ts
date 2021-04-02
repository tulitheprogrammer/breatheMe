export enum ActionType {
  ON_REGISTER = 'register,',
  ON_REGISTER_FAILED = 'register_fail',
  ON_REGISTER_SUCCESS = 'register_success',
  ON_LOG_IN = 'on_log_in',
  ON_LOG_IN_FAIL = 'on_log_in_fail',
  ON_LOG_IN_SUCCESS = 'on_log_in_success',
  ON_TOKEN_PERSIST = 'on_token_persist',
  ON_TOKEN_PERSIST_FAIL = 'on_token_persist_fail',
  ON_TOKEN_PERSIST_SUCCESS = 'on_token_persist_success',
  CHECK_TOKEN_PERSISTED = 'token_persisted',
  CHECK_TOKEN_PERSISTED_FAIL = 'token_persisted_fail',
  CHECK_TOKEN_PERSISTED_SUCCESS = 'token_persisted_success',

  START_SESSION = 'start_session',
  ON_FINISH_SESSION = 'finish_session',
  PERSIST_SESSION = 'persisted_session',
  ON_PERSIST_SESSION = 'on_persisted_session',
}
