import { NextFunction, Request, Response, Router } from "express";
import { IAuthorizer } from "../../../../../contexts/Shared/domain/model/authentication/IAuthorizer";
import { upload } from "../../../../../contexts/Shared/infrastructure/uploads/image-upload";
import * as controllers from '../../controllers';

export const productRoutesHandler = (createProductController: controllers.CreateProductController,getProductByProductIdController:controllers.GetProductByProductIdController,getProductsByUserIdController: controllers.GetProductsByUserIdController,updateProductController: controllers.UpdateProductController,adminAuthorizer:IAuthorizer<Request,Response,NextFunction>,userAuthorizer:IAuthorizer<Request,Response,NextFunction>, router: Router) : Router => {
    router.post('/product/create',adminAuthorizer.authorize,upload.single('file'), createProductController.validate, createProductController.invoke.bind(createProductController))
    router.get('/products/:userId', adminAuthorizer.authorize, getProductsByUserIdController.invoke.bind(getProductsByUserIdController))
    router.get('/product/:productId', userAuthorizer.authorize,getProductByProductIdController.invoke.bind(getProductByProductIdController))
    router.post('/product/update/:productId',adminAuthorizer.authorize,upload.single('file'), createProductController.validate, createProductController.invoke.bind(createProductController))
    return router
}