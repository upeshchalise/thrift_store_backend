import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { OrderDetailService } from "../../../../../contexts/Thrift/Orders/application/order-details.service";
import { Controller } from "../controller";

export class GetOrderDetailsController implements Controller {
    constructor(private orderDetailService: OrderDetailService) { }
    public async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { orderId } = req.params;
            const orderDetails = await this.orderDetailService.invoke(orderId);
            res.status(httpStatus.OK).send(orderDetails)
        } catch (error) {
            next(error)
        }
    }
}