import { Order } from "@prisma/client";

export interface GetOrderByUserIdRequest {
    userId: string;
}

export interface GetOrderByUserIdResponse {
    orders: Order[];
}