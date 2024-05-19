
import { Router } from "express";
import * as controllers from '../../controllers';

export const UserRoutesHandler = (getUserByEmailController:controllers.GetUserByEmailController, router: Router): Router => {
    router.get('/user', getUserByEmailController.invoke.bind(getUserByEmailController));
    return router
}