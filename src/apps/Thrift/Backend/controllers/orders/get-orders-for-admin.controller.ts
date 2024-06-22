import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { HTTP403Error, HTTP404Error } from "../../../../../contexts/Shared/domain/errors/http-exception";
import { MESSAGE_CODES } from "../../../../../contexts/Shared/infrastructure/utils/message-codes";
import { GetOrderForAdminService } from "../../../../../contexts/Thrift/Orders/application/get-orderes-for-admin.service";
import { GetUserByIdService } from "../../../../../contexts/Thrift/User/application/get-user-by-id.service";
import { Controller } from "../controller";

export class GetOrdersForAdminController implements Controller {
    constructor(
        private getUserByIdService: GetUserByIdService,
        private getOrderForAdminService: GetOrderForAdminService) { }
    public async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.headers.user_id as string;
            console.log("user_id", req.headers.user_id)
            const userExist = await this.getUserByIdService.invoke(req.headers.user_id as string)
            if (!userExist) {
                throw new HTTP404Error(MESSAGE_CODES.USER.USER_NOT_FOUND)
            }
            if (userExist.role !== "ADMIN") {
                throw new HTTP403Error(MESSAGE_CODES.USER.INVALID_ROLE)
            }
            const orders = await this.getOrderForAdminService.invoke()
            res.status(httpStatus.OK).send(orders)
        } catch (error) {
            next(error)
        }
    }
}