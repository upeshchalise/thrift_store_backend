import jwt from 'jsonwebtoken';
import { Payload, TokenScope } from '../../domain/interface/payload';

export const JWTSign = (
    payload: Payload,
    secret: string,
    options:jwt.SignOptions,
    refreshOptions: jwt.SignOptions
) : {
    access_token: string,
    refresh_token: string
} => {
    const refreshToken: Payload = {...payload, scope: [TokenScope.REFRESH]}
    return {
        access_token: jwt.sign(payload,secret,options),
        refresh_token: jwt.sign(payload,secret,refreshOptions)
    }
}