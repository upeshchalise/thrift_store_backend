/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from 'express';
import * as controllers from '../controllers';

export const healthCheckRoutesHandler = (healthCheckControllers: controllers.HealthCheckController, router: Router): Router => {
  router.get(
    '/health_check',
    healthCheckControllers.invoke.bind(healthCheckControllers)
    /*#swagger.tags = ['Health Check']
     */
  );
  return router;
};
