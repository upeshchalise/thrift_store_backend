import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { GetUserByIdService } from "../../../../../contexts/Thrift/User/application/get-user-by-id.service";
import { Controller } from "../controller";

export class GetUserByIdController implements Controller {
constructor(private getUserByIdService: GetUserByIdService){}
async invoke(req:Request, res:Response, next:NextFunction){
    const { userId } = req.params;
    const response = await this.getUserByIdService.invoke(userId)

    res.status(httpStatus.OK).send(response)
}
}