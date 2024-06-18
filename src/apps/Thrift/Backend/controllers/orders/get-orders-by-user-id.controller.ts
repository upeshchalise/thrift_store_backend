import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { HTTP404Error } from "../../../../../contexts/Shared/domain/errors/http-exception";
import { MESSAGE_CODES } from "../../../../../contexts/Shared/infrastructure/utils/message-codes";
import { GetOrderByUserIdService } from "../../../../../contexts/Thrift/Orders/application/get-order-by-user-id.service";
import { GetUserByIdService } from "../../../../../contexts/Thrift/User/application/get-user-by-id.service";
import { Controller } from "../controller";

export class GetOrdersByUserIdController implements Controller {
    constructor(private getUserByIdService: GetUserByIdService,
        private getOrderByUserIdService: GetOrderByUserIdService
    ) { }
    public async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.userId;
            const userExist = await this.getUserByIdService.invoke(userId)
            if (!userExist) {
                throw new HTTP404Error(MESSAGE_CODES.USER.USER_NOT_FOUND)
            }
            const response = await this.getOrderByUserIdService.invoke({ userId })
            res.status(httpStatus.OK).send(response)
        } catch (error) {
            next(error)
        }
    }
}