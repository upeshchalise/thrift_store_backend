
import { NextFunction, Request, Response, Router } from "express";
import { IAuthorizer } from "../../../../../contexts/Shared/domain/model/authentication/IAuthorizer";
import { upload } from "../../../../../contexts/Shared/infrastructure/uploads/image-upload";
import * as controllers from '../../controllers';


export const UserRoutesHandler = (getUserByEmailController: controllers.GetUserByEmailController, createUserController: controllers.CreateUserController, loginUserController: controllers.LoginUserController, getUserByIdController: controllers.GetUserByIdController, updateUserController: controllers.UpdateUserController, userAuthorizer: IAuthorizer<Request, Response, NextFunction>, router: Router): Router => {
    router.get('/user/email', getUserByEmailController.invoke.bind(getUserByEmailController));
    // register user
    router.post('/user/create', upload.single('file'), createUserController.validate, createUserController.invoke.bind(createUserController));
    // login user
    router.post('/user/login', loginUserController.validate, loginUserController.invoke.bind(loginUserController))
    // get user by id
    router.get('/user/:userId', getUserByIdController.invoke.bind(getUserByIdController))
    // update user
    router.put('/user/update/:userId', userAuthorizer.authorize, upload.single('file'), updateUserController.validate, updateUserController.invoke.bind(updateUserController))
    return router
}