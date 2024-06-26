import { OrderItems, OrderStatus } from "@prisma/client";
import { GetOrderByUserIdResponse } from "../interface/order-data.interface";

export interface IOrderRepository {
    makeOrder(user_id: string, total_amount: number, status: OrderStatus, destination: string, order_items: OrderItems[]): Promise<void>
    getOrdersByUserId(userId: string): Promise<GetOrderByUserIdResponse>
    getAllOrdersForAdmin(): Promise<GetOrderByUserIdResponse | null>
    orderDetail(order_id: string): Promise<any>
    markOrderDelivered(order_id: string): Promise<any>

}