import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from '../../../../contexts/Shared/domain/model/authentication/IAuthorizer';
import * as controllers from '../controllers';
import { healthCheckRoutesHandler } from './health-check.routes';
import { productRoutesHandler } from './products/products.routes';
import { UserRoutesHandler } from './user/user.routes';

export const MasterRouter = (
    healthCheckControllers: controllers.HealthCheckController,
    getUserByEmailController: controllers.GetUserByEmailController,
    createUserController: controllers.CreateUserController,
    loginUserController: controllers.LoginUserController,
    createProductController: controllers.CreateProductController,
    adminAuthorizer:IAuthorizer<Request,Response,NextFunction>
) : Router => {
    const apiRouter = Router();
    healthCheckRoutesHandler(healthCheckControllers, apiRouter);
    UserRoutesHandler(getUserByEmailController, createUserController,loginUserController,apiRouter)
    productRoutesHandler(createProductController,adminAuthorizer, apiRouter)

    return apiRouter
}