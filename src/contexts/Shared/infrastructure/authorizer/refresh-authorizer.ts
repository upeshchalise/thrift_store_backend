import { RequestHandler as Middleware, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP401Error } from '../../domain/errors/http-exception';
import { Payload, TokenScope } from '../../domain/interface/payload';
import { IAuthorizer } from '../../domain/model/authentication/IAuthorizer';

export class JWTRefreshAuthorizer implements IAuthorizer<Request, Response, NextFunction> {
    public authorize : Middleware = async (req:Request,res:Response, next: NextFunction):Promise<void> => {
        const {authorization} = req.headers;
        const tokenArray = authorization !== undefined ? authorization.split(' ') : [];
        const token = tokenArray[1];

        try {
            const payload: Payload = jwt.verify(token, process.env.JWT_SECRET_TOKEN!) as Payload
            if(payload.scope.includes(TokenScope.REFRESH)) {
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