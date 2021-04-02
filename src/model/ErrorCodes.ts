export class ErrorCodes {
  // equivalent to Backend
  public static SIGN_UP_FAILED = 1;
  public static SIGN_IN_FAILED = 2;
  public static SIGN_IN_FAILED_WRONG_PASSWORD = 3;
  public static SIGN_IN_FAILED_WRONG_USER = 4;
  public static SIGN_IN_FAILED_BANNED = 5;
  public static CHECK_PERSISTED_JWT_FAILED = 6;

  public static INTERNAL_ERROR = -1;
}
