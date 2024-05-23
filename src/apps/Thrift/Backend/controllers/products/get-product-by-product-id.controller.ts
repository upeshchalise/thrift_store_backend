import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { GetProductByProductIdService } from "../../../../../contexts/Thrift/Product/application/get-product-by-product-id.service";
import { Controller } from "../controller";
import { HTTP404Error } from "../../../../../contexts/Shared/domain/errors/http-exception";
import { MESSAGE_CODES } from "../../../../../contexts/Shared/infrastructure/utils/message-codes";

export class GetProductByProductIdController implements Controller {
    constructor(private getProductByProductIdService: GetProductByProductIdService){}
    async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { productId } = req.params; 
        const response = await this.getProductByProductIdService.invoke(productId as string); 
        if(response?.deleted_at !== null) {
            throw new HTTP404Error(MESSAGE_CODES.PRODUCT.PRODUCT_NOT_FOUND)
        }
        res.status(httpStatus.OK).send(response);

    }
}
