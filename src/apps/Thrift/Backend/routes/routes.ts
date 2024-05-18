import { Router } from 'express';
import * as controllers from '../controllers';
import { healthCheckRoutesHandler } from './health-check.routes';

export const MasterRouter = (
    healthCheckControllers: controllers.HealthCheckController,

) : Router => {
    const apiRouter = Router();
    healthCheckRoutesHandler(healthCheckControllers, apiRouter);
    return apiRouter
}