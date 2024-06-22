import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from '../../../../contexts/Shared/domain/model/authentication/IAuthorizer';
import * as controllers from '../controllers';
import { healthCheckRoutesHandler } from './health-check.routes';
import { orderRoutesHandler } from './order/order.routes';
import { productRoutesHandler } from './products/products.routes';
import { UserRoutesHandler } from './user/user.routes';

export const MasterRouter = (
    healthCheckControllers: controllers.HealthCheckController,
    getUserByEmailController: controllers.GetUserByEmailController,
    createUserController: controllers.CreateUserController,
    loginUserController: controllers.LoginUserController,
    createProductController: controllers.CreateProductController,
    getProductsByUserIdController: controllers.GetProductsByUserIdController,
    getProductByProductIdController: controllers.GetProductByProductIdController,
    getUserByIdController: controllers.GetUserByIdController,
    updateUserController: controllers.UpdateUserController,
    updateProductController: controllers.UpdateProductController,
    deleteProductController: controllers.DeleteProductController,
    getAllProductController: controllers.GetAllProductsController,
    makeOrderController: controllers.MakeOrderController,
    getOrdersByUserIdController: controllers.GetOrdersByUserIdController,
    getOrdersForAdminController: controllers.GetOrdersForAdminController,
    getOrderDetailsController: controllers.GetOrderDetailsController,
    markOrderDeliveredController: controllers.MarkOrderDeliveredController,
    customerAuthorizer: IAuthorizer<Request, Response, NextFunction>,
    userAuthorizer: IAuthorizer<Request, Response, NextFunction>,
    adminAuthorizer: IAuthorizer<Request, Response, NextFunction>
): Router => {
    const apiRouter = Router();
    healthCheckRoutesHandler(healthCheckControllers, apiRouter);
    UserRoutesHandler(getUserByEmailController, createUserController, loginUserController, getUserByIdController, updateUserController, userAuthorizer, apiRouter)
    productRoutesHandler(createProductController, getProductByProductIdController, getProductsByUserIdController, updateProductController, deleteProductController, getAllProductController, customerAuthorizer, userAuthorizer, adminAuthorizer, apiRouter)
    orderRoutesHandler(makeOrderController, getOrdersByUserIdController, getOrdersForAdminController, getOrderDetailsController, markOrderDeliveredController, userAuthorizer, adminAuthorizer, apiRouter);
    return apiRouter
}