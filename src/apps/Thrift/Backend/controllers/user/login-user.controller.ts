import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { HTTP422Error } from "../../../../../contexts/Shared/domain/errors/http-exception";
import { Payload, TokenScope } from "../../../../../contexts/Shared/domain/interface/payload";
import { JWTSign } from "../../../../../contexts/Shared/infrastructure/authorizer/jwt-sign";
import { comparePassword } from "../../../../../contexts/Shared/infrastructure/encryptor/encryptor";
import { RequestValidator } from "../../../../../contexts/Shared/infrastructure/middleware/request-validator";
import { MESSAGE_CODES } from "../../../../../contexts/Shared/infrastructure/utils/message-codes";
import { GetUserByEmailService } from "../../../../../contexts/Thrift/User/application/get-user-by-email.service";
import { Controller } from "../controller";

export class LoginUserController implements Controller {
    constructor(private getUserByEmailService: GetUserByEmailService){}
    public validate = [
        body('email').exists().withMessage(MESSAGE_CODES.USER.REQUIRED_EMAIL).isEmail().withMessage(MESSAGE_CODES.USER.INVALID_EMAIL),
        body('password')
          .exists()
          .withMessage(MESSAGE_CODES.USER.REQUIRED_PASSWORD)
          .isLength({ min: 6 })
          .withMessage(MESSAGE_CODES.USER.PASSWORD_MIN_LENGTH),
        RequestValidator
    ]
    async invoke(req:Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const {email,password} = req.body;
        const user = await this.getUserByEmailService.invoke(email);
        if(!user || (user && !comparePassword(password, user.password!))) {
            throw new HTTP422Error(MESSAGE_CODES.USER.INVALID_CREDENTIALS)
        }
        let payload: Payload;
if(user.role === UserRole.ADMIN) {
     payload = {
        user_id: user?.id as string,
        role: user?.role as string,
        scope: [TokenScope.ADMIN_ACCESS]
    }
} else {
     payload= {
        user_id: user?.id as string,
        role: user?.role as string,
        scope: [TokenScope.CUSTOMER_ACCESS]
    }
}
        const jwtToken = JWTSign(payload, process.env.JWT_SECRET_KEY as string, {expiresIn: 3600}, {expiresIn: 7200});
        res.status(httpStatus.OK).send({
            data: {
                token: jwtToken,
                user: {
                    id: user.id, // Include the id here
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    role: user.role,
                    image_url: user.imageUrl // No need for "?", as it's accessed after checking user existence
                }
            }
        });
        } catch (error) {
            next(error);
        }
        
    }
}