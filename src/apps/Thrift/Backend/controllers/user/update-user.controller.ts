import { NextFunction, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { HTTP404Error } from "../../../../../contexts/Shared/domain/errors/http-exception";
import { RequestValidator } from "../../../../../contexts/Shared/infrastructure/middleware/request-validator";
import { MESSAGE_CODES } from "../../../../../contexts/Shared/infrastructure/utils/message-codes";
import { GetUserByIdService } from "../../../../../contexts/Thrift/User/application/get-user-by-id.service";
import { UpdateUserService } from "../../../../../contexts/Thrift/User/application/update-user.service";
import { Controller } from "../controller";

export class UpdateUserController implements Controller {
    constructor( private getUserByIdService: GetUserByIdService, private updateUserService: UpdateUserService){}
    public validate = [
        body('first_name').exists().withMessage(MESSAGE_CODES.USER.INVALID_FIRST_NAME).optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_FIRST_NAME).bail(),
        body('last_name').exists().withMessage(MESSAGE_CODES.USER.INVALID_LAST_NAME).optional().isString().withMessage(MESSAGE_CODES.USER.INVALID_LAST_NAME).bail(),
        RequestValidator
    ]
    async invoke (req:any, res: Response, next: NextFunction) {
        const {userId} = req.params;
        // const {user_id} = req.user;
        // if (userId !== user_id) {
        //     throw new HTTP401Error(MESSAGE_CODES.NOT_AUTHORIZED)
        // }
        const {first_name, last_name} = req.body
        console.log(userId,first_name,last_name);
        const imageUrl = req.file ?  req.file.filename : null;
        const imageUrlFromFormData = req.file ? req.file.filename : null;
        const isUser = await this.getUserByIdService.invoke(userId)
        if(!isUser) {
            throw new HTTP404Error(MESSAGE_CODES.USER.USER_NOT_FOUND)
        }
        if(imageUrl) {

            await this.updateUserService.invoke(userId,first_name, last_name, imageUrl ? imageUrl : '')
        }else {
            await this.updateUserService.invoke(userId,first_name,last_name)
        }
        res.status(httpStatus.OK).send()
    }
}