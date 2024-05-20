import { NextFunction, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { RequestValidator } from "../../../../../contexts/Shared/infrastructure/middleware/request-validator";
import { MESSAGE_CODES } from "../../../../../contexts/Shared/infrastructure/utils/message-codes";
import { CreateProductService } from "../../../../../contexts/Thrift/Product/application/create-product.service";
import { Controller } from "../controller";

export class CreateProductController implements Controller {
    constructor(private createProductService: CreateProductService) {}
    public validate = [
        body('name').exists().withMessage(MESSAGE_CODES.PRODUCT.INVALID_PRODUCT_NAME).notEmpty().withMessage(MESSAGE_CODES.PRODUCT.INVALID_PRODUCT_NAME).isString().withMessage(MESSAGE_CODES.PRODUCT.INVALID_PRODUCT_NAME),
        body('price').exists().withMessage(MESSAGE_CODES.PRODUCT.INVALID_PRODUCT_PRICE).notEmpty().withMessage(MESSAGE_CODES.PRODUCT.INVALID_PRODUCT_PRICE).isNumeric().withMessage(MESSAGE_CODES.PRODUCT.INVALID_PRODUCT_PRICE).bail(),
        RequestValidator
    ]
    async invoke(req:any, res:Response, next: NextFunction) : Promise<void> {
        // const user_id = req.headers.user_id as string;
        const {user_id} = req.user
        const {name, price} = req.body;
        console.log(user_id,name, price);
        const imageUrl = req.file ?  req.file.filename : null;
        const imageUrlFromFormData = req.file ? req.file.filename : null;
        const product = await this.createProductService.invoke({user_id,name, price: Number(price), imageUrl: imageUrl || imageUrlFromFormData} )

        res.status(httpStatus.CREATED).send()
    }
}