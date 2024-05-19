import { NextFunction, Request, Response } from "express-serve-static-core";
import httpStatus from "http-status";
import { GetUserByEmailService } from "../../../../../contexts/Thrift/User/application/get-user-by-email.service";
import { Controller } from "../controller";


export class GetUserByEmailController implements Controller {
    constructor(private getUserByEmailService: GetUserByEmailService){}

     async invoke(req:Request, res:Response,next:NextFunction):Promise<void> {
        try {
            const {email} = req.body
            const user = await this.getUserByEmailService.invoke(email)
            res.status(httpStatus.OK).send(user)
        } catch (error) {
            next(error)
        }
    }
}   