import { Router } from 'express';
import * as controllers from '../controllers';
import { healthCheckRoutesHandler } from './health-check.routes';
import { UserRoutesHandler } from './user/user.routes';

export const MasterRouter = (
    healthCheckControllers: controllers.HealthCheckController,
    getUserByEmailController: controllers.GetUserByEmailController
) : Router => {
    const apiRouter = Router();
    healthCheckRoutesHandler(healthCheckControllers, apiRouter);
    UserRoutesHandler(getUserByEmailController, apiRouter)

    return apiRouter
}