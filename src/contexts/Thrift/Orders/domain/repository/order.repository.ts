import { OrderItems, OrderStatus } from "@prisma/client";
import { GetOrderByUserIdResponse } from "../interface/order-data.interface";

export interface IOrderRepository {
    makeOrder(user_id: string, total_amount: number, status: OrderStatus, order_items: OrderItems[]): Promise<void>
    getOrdersByUserId(userId: string): Promise<GetOrderByUserIdResponse>
}