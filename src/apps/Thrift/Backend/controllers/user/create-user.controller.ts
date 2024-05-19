import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { HTTP400Error, HTTP422Error } from "../../../../../contexts/Shared/domain/errors/http-exception";
import { hashPassword } from "../../../../../contexts/Shared/infrastructure/encryptor/encryptor";
import { RequestValidator, isOneOf } from "../../../../../contexts/Shared/infrastructure/middleware/request-validator";
import { MESSAGE_CODES } from "../../../../../contexts/Shared/infrastructure/utils/message-codes";
import { CreateUserService } from "../../../../../contexts/Thrift/User/application/create-user.service";
import { GetUserByEmailService } from "../../../../../contexts/Thrift/User/application/get-user-by-email.service";
import { Controller } from "../controller";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isValidEmail = (value: string) => {
    return emailRegex.test(value);
};
export class CreateUserController implements Controller {
    constructor(private createUserService: CreateUserService,
        private getUserByEmailService: GetUserByEmailService
    ) {}
    public validate = [
        body('email').exists().withMessage(MESSAGE_CODES.USER.INVALID_EMAIL).custom(value => {
            if (!isValidEmail(value)) {
                throw new Error(MESSAGE_CODES.USER.INVALID_EMAIL);
            }
            return true;
        }),
        body('password')
      .exists()
      .withMessage(MESSAGE_CODES.USER.REQUIRED_PASSWORD)
      .isLength({ min: 6 })
      .withMessage(MESSAGE_CODES.USER.PASSWORD_MIN_LENGTH),
    body('confirm_password')
      .exists()
      .withMessage(MESSAGE_CODES.USER.REQUIRED_PASSWORD)
      .isLength({ min: 6 })
      .withMessage(MESSAGE_CODES.USER.PASSWORD_MIN_LENGTH)
      .custom(async (confirm_password: string, { req }) => {
        if (confirm_password === req.body.password) return true;
        throw new HTTP422Error(MESSAGE_CODES.USER.CONFIRM_PASSWORD_NOT_MATCH);
      }),
    body('first_name').exists().withMessage(MESSAGE_CODES.USER.INVALID_FIRST_NAME).isString().withMessage(MESSAGE_CODES.USER.INVALID_FIRST_NAME).notEmpty().withMessage(MESSAGE_CODES.USER.INVALID_FIRST_NAME),
    body('last_name').exists().withMessage(MESSAGE_CODES.USER.INVALID_LAST_NAME).isString().withMessage(MESSAGE_CODES.USER.INVALID_LAST_NAME).notEmpty().withMessage(MESSAGE_CODES.USER.INVALID_LAST_NAME),
    body('role').exists().withMessage(MESSAGE_CODES.USER.INVALID_ROLE).custom(isOneOf(UserRole, MESSAGE_CODES.USER.INVALID_ROLE)).bail(),
    RequestValidator
      ];
    async invoke(req:Request, res: Response, next: NextFunction) : Promise<void> {
        const {email, password, first_name,last_name, role} = req.body
        const imageUrl = req.file ?  req.file.filename : null;
        const imageUrlFromFormData = req.file ? req.file.filename : null;
        const isUser = await this.getUserByEmailService.invoke(email)
        if(isUser) {
            throw new HTTP400Error(MESSAGE_CODES.USER.USER_ALREADY_EXISTS)
        }
        const hashedPassword =  hashPassword(password)
        const user = await this.createUserService.invoke({email,password: hashedPassword,first_name,last_name,role,imageUrl: imageUrl || imageUrlFromFormData})
        res.status(httpStatus.CREATED).send()
    }
}