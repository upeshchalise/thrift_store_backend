import { OrderItems, OrderStatus } from "@prisma/client"

export interface IMakeOrderRequest {
    userId: string
    total_amount: number,
    status: OrderStatus,
    destination: string,
    order_items: OrderItems[]
}