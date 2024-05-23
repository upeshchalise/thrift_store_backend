import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { HTTP401Error, HTTP404Error } from "../../../../../contexts/Shared/domain/errors/http-exception";
import { MESSAGE_CODES } from "../../../../../contexts/Shared/infrastructure/utils/message-codes";
import { DeleteProductService } from "../../../../../contexts/Thrift/Product/application/delete-product.service";
import { GetProductByProductIdService } from "../../../../../contexts/Thrift/Product/application/get-product-by-product-id.service";
import { GetUserByIdService } from "../../../../../contexts/Thrift/User/application/get-user-by-id.service";
import { Controller } from "../controller";

export class DeleteProductController implements Controller {
    
    constructor(private deleteProductService: DeleteProductService, private getUserByIdService: GetUserByIdService, private getProductByProductIdService: GetProductByProductIdService){}

    async invoke(req:any,res:Response,next:NextFunction): Promise<void> {
        const { productId } = req.params;
        const {user_id} = req.user;
        const isProduct = await this.getProductByProductIdService.invoke(productId);
        if(!isProduct) {
            throw new HTTP404Error(MESSAGE_CODES.PRODUCT.PRODUCT_NOT_FOUND)
        }
        const isUser = await this.getUserByIdService.invoke(user_id);
        if(!isUser) {
            throw new HTTP404Error(MESSAGE_CODES.USER.USER_NOT_FOUND)
        }
        if(isProduct.user_id !== user_id) {
            throw new HTTP401Error(MESSAGE_CODES.PERMISSION_DENIED)
        }
        await this.deleteProductService.invoke(productId)
        res.status(httpStatus.OK).send()

    }
}