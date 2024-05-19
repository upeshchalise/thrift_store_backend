
import { Router } from "express";
import { upload } from "../../../../../contexts/Shared/infrastructure/uploads/image-upload";
import * as controllers from '../../controllers';


export const UserRoutesHandler = (getUserByEmailController:controllers.GetUserByEmailController,createUserController:controllers.CreateUserController, router: Router): Router => {
    router.get('/user', getUserByEmailController.invoke.bind(getUserByEmailController));
    router.post('/create-user',upload.single('file'), createUserController.validate, createUserController.invoke.bind(createUserController))
    return router
}