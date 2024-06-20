import { OrderStatus } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { body, param } from "express-validator";
import httpStatus from "http-status";
import { RequestValidator } from "../../../../../contexts/Shared/infrastructure/middleware/request-validator";
import { MESSAGE_CODES } from "../../../../../contexts/Shared/infrastructure/utils/message-codes";
import { MakeOrderService } from "../../../../../contexts/Thrift/Orders/application/make-order.service";
import { Controller } from "../controller";

export class MakeOrderController implements Controller {
    constructor(private makeOrderService: MakeOrderService) { }
    public validate = [
        param('userId').exists().withMessage(MESSAGE_CODES.USER.INVALID_USER_ID).notEmpty().withMessage(MESSAGE_CODES.USER.INVALID_USER_ID).isString().withMessage(MESSAGE_CODES.USER.INVALID_USER_ID),
        body('total_amount').exists().withMessage(MESSAGE_CODES.ORDER.INVALID_AMOUNT).notEmpty().withMessage(MESSAGE_CODES.ORDER.INVALID_AMOUNT).isNumeric().withMessage(MESSAGE_CODES.ORDER.INVALID_AMOUNT).bail(),
        body('order_items').isArray().withMessage(MESSAGE_CODES.ORDER.INVALID_ORDER_ITEMS),

        body('order_items.*.product_id').exists().withMessage(MESSAGE_CODES.ORDER.INVALID_PRODUCT_ID)
            .isString().withMessage(MESSAGE_CODES.ORDER.INVALID_PRODUCT_ID),

        body('order_items.*.quantity').exists().withMessage(MESSAGE_CODES.ORDER.INVALID_QUANTITY)
            .isInt({ min: 1 }).withMessage(MESSAGE_CODES.ORDER.INVALID_QUANTITY),

        body('order_items.*.unit_price').exists().withMessage(MESSAGE_CODES.ORDER.INVALID_UNIT_PRICE)
            .isNumeric().withMessage(MESSAGE_CODES.ORDER.INVALID_UNIT_PRICE),
        RequestValidator
    ]
    public async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // console.log("first", req.params.userId)
            await this.makeOrderService.invoke({ userId: req.params.userId, total_amount: req.body.total_amount, status: OrderStatus.PENDING, order_items: req.body.order_items });
            res.status(httpStatus.OK).send()
        } catch (error) {
            next(error)
        }
    }
}