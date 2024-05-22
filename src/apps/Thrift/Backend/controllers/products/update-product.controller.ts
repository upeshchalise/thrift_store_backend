import { NextFunction, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { HTTP401Error, HTTP404Error } from "../../../../../contexts/Shared/domain/errors/http-exception";
import { RequestValidator } from "../../../../../contexts/Shared/infrastructure/middleware/request-validator";
import { MESSAGE_CODES } from "../../../../../contexts/Shared/infrastructure/utils/message-codes";
import { GetProductByProductIdService } from "../../../../../contexts/Thrift/Product/application/get-product-by-product-id.service";
import { UpdateProductService } from "../../../../../contexts/Thrift/Product/application/update-product.service";
import { GetUserByIdService } from "../../../../../contexts/Thrift/User/application/get-user-by-id.service";
import { Controller } from "../controller";

export class UpdateProductController implements Controller {
    constructor(private updateProductService: UpdateProductService, private getUserByIdService: GetUserByIdService, private getProductByProductIdService: GetProductByProductIdService){}
   
    public validate = [
        body('name').exists().withMessage(MESSAGE_CODES.PRODUCT.INVALID_PRODUCT_NAME).optional().withMessage(MESSAGE_CODES.PRODUCT.INVALID_PRODUCT_NAME).isString().withMessage(MESSAGE_CODES.PRODUCT.INVALID_PRODUCT_NAME),
        body('price').exists().withMessage(MESSAGE_CODES.PRODUCT.INVALID_PRODUCT_PRICE).optional().withMessage(MESSAGE_CODES.PRODUCT.INVALID_PRODUCT_PRICE).isNumeric().withMessage(MESSAGE_CODES.PRODUCT.INVALID_PRODUCT_PRICE).bail(),
        body('description').exists().withMessage(MESSAGE_CODES.PRODUCT.INVALID_PRODUCT_DESCRIPTION).optional().withMessage(MESSAGE_CODES.PRODUCT.INVALID_PRODUCT_DESCRIPTION).isString().withMessage(MESSAGE_CODES.PRODUCT.INVALID_PRODUCT_DESCRIPTION).bail(),
        body('quantity').exists().withMessage(MESSAGE_CODES.PRODUCT.INVALID_QUANTITY).optional().withMessage(MESSAGE_CODES.PRODUCT.INVALID_QUANTITY).isNumeric().withMessage(MESSAGE_CODES.PRODUCT.INVALID_QUANTITY).bail(),
        RequestValidator
    ]
    async invoke(req:any, res:Response, next:NextFunction): Promise<void> {
        const {productId} = req.params;
        const {user_id} = req.user;

        const {name, description, quantity, price} = req.body;
        const imageUrl = req.file ? req.file.filename : null
        const isUser = await this.getUserByIdService.invoke(user_id);
        if(!isUser) {
            throw new HTTP404Error(MESSAGE_CODES.USER.USER_NOT_FOUND)
        }
        const isProduct = await this.getProductByProductIdService.invoke(productId);
        if(!productId) {
            throw new HTTP404Error(MESSAGE_CODES.PRODUCT.PRODUCT_NOT_FOUND);
        }
        if(user_id !== isProduct?.user_id) {
            throw new HTTP401Error(MESSAGE_CODES.PERMISSION_DENIED)
        }

        if(imageUrl !== null ) {
            await this.updateProductService.invoke(productId, name, description, quantity, price, imageUrl)
        }
        else {
            await this.updateProductService.invoke(productId,name,description,quantity,price)
        }

        res.status(httpStatus.OK).send()
    }
}