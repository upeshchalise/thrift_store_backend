import { OrderItems, OrderStatus } from "@prisma/client";

export interface IOrderRepository {
    makeOrder(user_id: string, total_amount: number, status:OrderStatus, order_items: OrderItems[]):Promise<void>
}