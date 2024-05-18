/* eslint-disable   @typescript-eslint/no-unsafe-argument */
import { Request, Response } from "express";
import { CustomValidator, validationResult } from "express-validator";
import httpStatus from "http-status";
import { HTTP422Error } from "../../domain/errors/http-exception";

export const RequestValidator = (
  req: Request,
  res: Response,
  next: Function
): any => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  console.log(validationErrors);
  return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
    message: validationErrors.array()[0].msg,
  });
};

export const isOneOf =
  (object: any, message: string): CustomValidator =>
  (val) => {
    if (Object.keys(object).length === 0) return true;

    /* eslint-disable no-restricted-syntax */
    for (const key in object) {
      if (object[key] === val) return true;
    }
    throw new HTTP422Error(message);
  };
