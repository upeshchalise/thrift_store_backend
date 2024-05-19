
import { Router } from "express";
import { upload } from "../../../../../contexts/Shared/infrastructure/uploads/image-upload";
import * as controllers from '../../controllers';


export const UserRoutesHandler = (getUserByEmailController:controllers.GetUserByEmailController,createUserController:controllers.CreateUserController, loginUserController:controllers.LoginUserController, router: Router): Router => {
    router.get('/user', getUserByEmailController.invoke.bind(getUserByEmailController));
    // register user
    router.post('/user/create',upload.single('file'), createUserController.validate, createUserController.invoke.bind(createUserController));
    // login user
    router.post('/user/login',loginUserController.validate, loginUserController.invoke.bind(loginUserController))
    return router
}