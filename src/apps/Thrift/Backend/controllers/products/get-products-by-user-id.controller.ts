import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { GetProductsByUserIdService } from "../../../../../contexts/Thrift/Product/application/get-produts-by-user-id.service";
import { Controller } from "../controller";

export class GetProductsByUserIdController implements Controller {
    constructor(private getProductsByUserIdService: GetProductsByUserIdService) {}
    async invoke(req:Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const {userId} = req.params;
            const response = await this.getProductsByUserIdService.invoke(userId)
            console.log(response);
            res.status(httpStatus.OK).send(response)
        } catch (error) {
            next(error);
        }
    }
}