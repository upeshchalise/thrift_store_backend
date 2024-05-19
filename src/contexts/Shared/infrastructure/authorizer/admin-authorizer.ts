import { UserRole } from '@prisma/client';
import { RequestHandler as Middleware, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP401Error } from '../../domain/errors/http-exception';
import { Payload, TokenScope } from '../../domain/interface/payload';
import { IAuthorizer } from '../../domain/model/authentication/IAuthorizer';

export class JWTAdminAuthorizer implements IAuthorizer<Request, Response, NextFunction> {
    public authorize : Middleware = async (req:Request,res:Response, next: NextFunction):Promise<void> => {
        const { authorization } = req.headers;
        if (!authorization) {
            return next(new HTTP401Error("Authorization header is missing"));
        }

        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return next(new HTTP401Error("Invalid Authorization header format"));
        }
        console.log("upto here");
        try {
            console.log("upto here 2");
            console.log(token);
            const payload: Payload = jwt.verify(token, process.env.JWT_SECRET_TOKEN!) as Payload
            console.log("here is payload", payload);
            if(payload.role === UserRole.ADMIN && payload.scope.includes(TokenScope.ADMIN_ACCESS)) {
                req.body.user = payload;
                return next()
            } else {
                return next(new HTTP401Error())
            }
        } catch (error) {
            return next(new HTTP401Error())
        }
    }
}