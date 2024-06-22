import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { HTTP403Error, HTTP404Error } from "../../../../../contexts/Shared/domain/errors/http-exception";
import { MESSAGE_CODES } from "../../../../../contexts/Shared/infrastructure/utils/message-codes";
import { MarkOrderDeliveredService } from "../../../../../contexts/Thrift/Orders/application/mark-order-delivered.service";
import { GetUserByIdService } from "../../../../../contexts/Thrift/User/application/get-user-by-id.service";
import { Controller } from "../controller";

export class MarkOrderDeliveredController implements Controller {
    constructor(
        private getUserByIdService: GetUserByIdService,
        private markOrderDeliveredService: MarkOrderDeliveredService) { }
    public async invoke(req: any, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user_id } = req.user;
            const { order_id } = req.params.orderId
            console.log("order_id", order_id)

            const userExist = await this.getUserByIdService.invoke(user_id)
            if (!userExist) {
                throw new HTTP404Error(MESSAGE_CODES.USER.USER_NOT_FOUND)
            }
            if (userExist.role !== "ADMIN") {
                throw new HTTP403Error(MESSAGE_CODES.USER.INVALID_ROLE)
            }
            await this.markOrderDeliveredService.invoke(req.params.orderId)
            res.status(httpStatus.OK).send()
        } catch (error) {
            next(error)
        }
    }
}