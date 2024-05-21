import { NextFunction, Request, Response } from "express";
import { query } from "express-validator";
import httpStatus from "http-status";
import { MESSAGE_CODES } from "../../../../../contexts/Shared/infrastructure/utils/message-codes";
import { GetProductsByUserIdService } from "../../../../../contexts/Thrift/Product/application/get-produts-by-user-id.service";
import { Controller } from "../controller";

export class GetProductsByUserIdController implements Controller {
    constructor(private getProductsByUserIdService: GetProductsByUserIdService) {}

    public validate = [
        query('page').optional().isNumeric().withMessage(MESSAGE_CODES.SHARED.INVALID_PAGE),
    query('pageSize').optional().isNumeric().withMessage(MESSAGE_CODES.SHARED.INVALID_PAGE_SIZE)
    ]
    async invoke(req:Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const {userId} = req.params;
            const page = Number(req.query.page);
            const pageSize = Number(req.query.pageSize);
            const search = req.query.search as string;
            console.log(req.query);
            const response = await this.getProductsByUserIdService.invoke(userId,page,pageSize,search)
            res.status(httpStatus.OK).send(response)
        } catch (error) {
            next(error);
        }
    }
}