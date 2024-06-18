
import { NextFunction, Request, Response, Router } from "express";
import { IAuthorizer } from "../../../../../contexts/Shared/domain/model/authentication/IAuthorizer";
import * as controllers from '../../controllers';


export const orderRoutesHandler = (makeOrderController: controllers.MakeOrderController, getOrdersByUserIdController: controllers.GetOrdersByUserIdController, userAuthorizer: IAuthorizer<Request, Response, NextFunction>, router: Router): Router => {
    router.post('/user/:userId/orders/create', userAuthorizer.authorize, makeOrderController.validate, makeOrderController.invoke.bind(makeOrderController))
    router.get('/user/:userId/orders', userAuthorizer.authorize, getOrdersByUserIdController.invoke.bind(getOrdersByUserIdController))
    return router
}