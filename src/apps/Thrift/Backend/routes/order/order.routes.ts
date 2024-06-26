
import { NextFunction, Request, Response, Router } from "express";
import { IAuthorizer } from "../../../../../contexts/Shared/domain/model/authentication/IAuthorizer";
import * as controllers from '../../controllers';



export const orderRoutesHandler = (makeOrderController: controllers.MakeOrderController, getOrdersByUserIdController: controllers.GetOrdersByUserIdController, getOrdersForAdminController: controllers.GetOrdersForAdminController, getOrderDetailsController: controllers.GetOrderDetailsController, markOrderDeliveredController: controllers.MarkOrderDeliveredController, userAuthorizer: IAuthorizer<Request, Response, NextFunction>, adminAuthorizer: IAuthorizer<Request, Response, NextFunction>, router: Router): Router => {
    router.post('/user/:userId/orders/create', userAuthorizer.authorize, makeOrderController.validate, makeOrderController.invoke.bind(makeOrderController))
    router.get('/orders/user/:userId', userAuthorizer.authorize, getOrdersByUserIdController.invoke.bind(getOrdersByUserIdController))
    router.get('/admin/all/orders', adminAuthorizer.authorize, getOrdersForAdminController.invoke.bind(getOrdersForAdminController))
    router.get("/order/:orderId/details", userAuthorizer.authorize, getOrderDetailsController.invoke.bind(getOrderDetailsController))
    router.post("/order/deliver/:orderId", adminAuthorizer.authorize, markOrderDeliveredController.invoke.bind(markOrderDeliveredController))


    return router
}