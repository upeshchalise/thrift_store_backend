import { Router } from 'express';
import * as controllers from '../controllers';
import { healthCheckRoutesHandler } from './health-check.routes';
import { UserRoutesHandler } from './user/user.routes';

export const MasterRouter = (
    healthCheckControllers: controllers.HealthCheckController,
    getUserByEmailController: controllers.GetUserByEmailController,
    createUserController: controllers.CreateUserController
) : Router => {
    const apiRouter = Router();
    healthCheckRoutesHandler(healthCheckControllers, apiRouter);
    UserRoutesHandler(getUserByEmailController, createUserController,apiRouter)

    return apiRouter
}