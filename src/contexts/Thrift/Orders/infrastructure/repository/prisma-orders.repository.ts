import { OrderItems, OrderStatus, PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { IOrderRepository } from "../../domain/repository/order.repository";

export class PrismaOrderRepository implements IOrderRepository {
    constructor(private db: PrismaClient){}
    public async makeOrder(user_id: string, total_amount: number, status:OrderStatus, order_items: OrderItems[]):Promise<void> {
       const id = randomUUID()
        await this.db.order.create({
            data: {
                id,
                user_id,
                total_amount,
                status,
                order_items: {
                    createMany: {
                        data: order_items.map((item: any) => ({
                            order_id: id,
                            product_id: item.product_id,
                            quantity: item.quantity,
                            unit_price: item.unit_price,
                        }))
                    }
                }
            }
        })
    }
}