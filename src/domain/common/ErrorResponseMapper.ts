import { ResponseMapper } from './ResponseMapper';
import { ErrorEntity } from '../../model/entity/ErrorEntity';
import { ErrorResponse } from '../../data/ErrorResponse';
import { ErrorCodes } from '../../utils/Constants';

export class ErrorResponseMapper
  implements ResponseMapper<ErrorEntity, ErrorResponse> {
  private getErrorMessageByCode(code: number): string {
    let message = '';
    switch (code) {
      case ErrorCodes.SIGN_UP_FAILED_EMAIL_EXISTS:
        message = 'Email already exists. Please pick another one';
        break;
      case ErrorCodes.SIGN_UP_FAILED_USER_EXISTS:
        message = 'Username already exists. Please pick another one';
        break;
    }
    return message;
  }

  mapEntity(entity: ErrorEntity): ErrorResponse {
    return new ErrorResponse(
      this.getErrorMessageByCode(entity.code),
      entity.code,
    );
  }
}
