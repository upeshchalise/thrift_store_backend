import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import { Router as ExpressRouter } from "express";
import helmet from "helmet";


import { ErrorMiddleware } from "../../../contexts/Shared/infrastructure/middleware/error-middleware";

export const Router = (masterRouter: ExpressRouter, errorMiddleware: ErrorMiddleware): ExpressRouter => {
    const allowedOrigins = ['http://localhost:5173'];

    const router = ExpressRouter();
    router
    .use(helmet())
    .use(cors({
        origin: function(origin, callback) {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        }
      }))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(compression())
    
    router.use('/api', masterRouter);

    router.use(errorMiddleware.routeNotFoundErrorHandler)
    router.use(errorMiddleware.clientErrorHandler)
    router.use(errorMiddleware.InternalServerError)
    return router
}

