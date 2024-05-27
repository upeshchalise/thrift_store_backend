import { NextFunction, Request, Response } from "express";
import { query } from "express-validator";
import httpStatus from "http-status";
import { RequestValidator } from "../../../../../contexts/Shared/infrastructure/middleware/request-validator";
import { MESSAGE_CODES } from "../../../../../contexts/Shared/infrastructure/utils/message-codes";
import { GetAllProductService } from "../../../../../contexts/Thrift/Product/application/get-all-product.service";
import { Controller } from "../controller";

export class GetAllProductsController implements Controller {
    constructor(private getAllProductService:GetAllProductService){}

    public validate = [
        query('page').optional().isNumeric().withMessage(MESSAGE_CODES.SHARED.INVALID_PAGE),
    query('pageSize').optional().isNumeric().withMessage(MESSAGE_CODES.SHARED.INVALID_PAGE_SIZE),
    RequestValidator
    ]
     async invoke(req:Request,res:Response,next:NextFunction):Promise<void> {
        try {
            const page = Number(req.query.page);
            const pageSize = Number(req.query.pageSize);
            const search = req.query.search as string;
            console.log(req.query);
            const response = await this.getAllProductService.invoke(page,pageSize,search)
            res.status(httpStatus.OK).send(response)
        } catch (error) {
            next(error);
        }
    }
}
