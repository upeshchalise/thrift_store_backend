import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import { Router as ExpressRouter } from "express";
import helmet from "helmet";


import { ErrorMiddleware } from "../../../contexts/Shared/infrastructure/middleware/error-middleware";

export const Router = (masterRouter: ExpressRouter, errorMiddleware: ErrorMiddleware): ExpressRouter => {
    const router = ExpressRouter();
    router
    .use(helmet())
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(compression())

    router.use('/api', masterRouter);

    router.use(errorMiddleware.routeNotFoundErrorHandler)
    router.use(errorMiddleware.clientErrorHandler)
    router.use(errorMiddleware.InternalServerError)
    return router
}

