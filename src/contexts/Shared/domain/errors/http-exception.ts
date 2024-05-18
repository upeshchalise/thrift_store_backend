import httpStatus from "http-status";
import { MESSAGE_CODES } from "../../infrastructure/utils/message-codes";

export class HTTPClientError extends Error {
  readonly statusCode!: number;

  errors?: any[];

  protected constructor(message: object | string) {
    super(message.toString());
    Object.setPrototypeOf(this, HTTPClientError.prototype);
  }
}

export class HTTP422Error extends HTTPClientError {
  readonly statusCode = httpStatus.UNPROCESSABLE_ENTITY;
  constructor(
    message: string | object = MESSAGE_CODES.UNPROCESSABLE_ENTITY,
    errors: any[] | undefined = undefined
  ) {
    super(message);
    this.errors = errors;
  }
}

export class HTTP404Error extends HTTPClientError {
  readonly statusCode = httpStatus.NOT_FOUND;
  constructor(message: string | object = MESSAGE_CODES.NOT_FOUND) {
    super(message);
  }
}

export class HTTP400Error extends HTTPClientError {
  readonly statusCode = httpStatus.BAD_REQUEST;
  constructor(message: string | object = MESSAGE_CODES.BAD_REQUEST) {
    super(message);
  }
}

export class HTTP401Error extends HTTPClientError {
  readonly statusCode = 401;
  constructor(message: string | object = MESSAGE_CODES.NOT_AUTHORIZED) {
    super(message);
  }
}

export class HTTP403Error extends HTTPClientError {
  readonly statusCode = httpStatus.FORBIDDEN;

  constructor(message: string | object = MESSAGE_CODES.PERMISSION_DENIED) {
    super(message);
  }
}
