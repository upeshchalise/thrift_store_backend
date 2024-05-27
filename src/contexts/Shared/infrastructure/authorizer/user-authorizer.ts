import { UserRole } from '@prisma/client';
import { RequestHandler as Middleware, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP401Error } from '../../domain/errors/http-exception';
import { Payload, TokenScope } from '../../domain/interface/payload';
import { IAuthorizer } from '../../domain/model/authentication/IAuthorizer';

export class JWTUserAuthorizer implements IAuthorizer<Request, Response, NextFunction> {
    public authorize : Middleware = async (req:any,res:Response, next: NextFunction):Promise<void> => {
        const {authorization} = req.headers;
        const tokenArray = authorization !== undefined ? authorization.split(' ') : [];
        const token = tokenArray[1];
        console.log("token",token);
        try {
            const validRoles = [UserRole.ADMIN, UserRole.CUSTOMER];
            const payload: Payload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as Payload
            if(validRoles.includes(payload.role as any) && (payload.scope.includes(TokenScope.ADMIN_ACCESS) || payload.scope.includes(TokenScope.CUSTOMER_ACCESS))) {
                req.user = payload;
                return next()
            } else {
                return next(new HTTP401Error())
            }
        } catch (error) {
            return next(new HTTP401Error())
        }
    }
}