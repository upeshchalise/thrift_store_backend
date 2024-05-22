import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { GetProductByProductIdService } from "../../../../../contexts/Thrift/Product/application/get-product-by-product-id.service";
import { Controller } from "../controller";

export class GetProductByProductIdController implements Controller {
    constructor(private getProductByProductIdService: GetProductByProductIdService){}
    async invoke(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { productId } = req.params; // Corrected destructuring
        const response = await this.getProductByProductIdService.invoke(productId as string); // Assuming productId is a string
        res.status(httpStatus.OK).send(response);
    }
}
