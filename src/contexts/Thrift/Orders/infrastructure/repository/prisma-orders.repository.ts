import { OrderItems, OrderStatus, PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { GetOrderByUserIdResponse } from "../../domain/interface/order-data.interface";
import { IOrderRepository } from "../../domain/repository/order.repository";

export class PrismaOrderRepository implements IOrderRepository {
    constructor(private db: PrismaClient) { }
    public async makeOrder(user_id: string, total_amount: number, status: OrderStatus, destination: string, order_items: OrderItems[]): Promise<void> {
        const id = randomUUID()
        await this.db.order.create({
            data: {
                id,
                user_id,
                total_amount,
                status,
                destination,
                order_items: {
                    createMany: {
                        data: order_items.map((item: any) => ({
                            product_id: item.product_id,
                            quantity: item.quantity,
                            unit_price: item.unit_price,
                        }))
                    }
                }
            }
        })
    }

    public async getOrdersByUserId(userId: string): Promise<GetOrderByUserIdResponse | any> {
        const response = await this.db.order.findMany({
            where: {
                user_id: userId,
            },
            include: {
                order_items: {
                    include: {
                        product: true
                    }
                },
            },
            orderBy: {
                created_at: 'desc'
            }
        })
        // console.log(response);
        return response
    }

    public async getAllOrdersForAdmin(): Promise<GetOrderByUserIdResponse | any> {

        let total_sale: number = 0;
        let total_quantity: number = 0;

        const response = await this.db.order.findMany({
            include: {
                order_items: {
                    include: {
                        product: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        imageUrl: true,
                        email: true,
                        first_name: true,
                        last_name: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        response?.forEach((item) => {
            if (item.status === 'DELIVERED') {
                total_sale += item.total_amount
            }
        })
        // response.forEach((item) => {
        //     item.order_items.forEach((i) => {
        //         total_quantity += i.quantity
        //     })
        // })
        // console.log(response);
        return { response, total_sale, total_quantity }
    }

    public async orderDetail(order_id: string): Promise<any> {
        return await this.db.order.findUnique({
            where: {
                id: order_id
            },
            select: {
                id: true,
                order_date: true,
                status: true,
                destination: true,
                total_amount: true,
                order_items: {
                    select: {
                        product: true,
                        quantity: true,
                        unit_price: true,
                        product_id: true
                    }
                },
                user: {
                    select: {
                        email: true,
                        first_name: true,
                        last_name: true,
                        id: true,
                        imageUrl: true,
                    }
                }
            }
        })
    }

    public async markOrderDelivered(order_id: string): Promise<any> {
        await this.db.order.update({
            where: {
                id: order_id
            }, data: {
                status: OrderStatus.DELIVERED,
                updated_at: new Date(Date.now())
            }
        })

    }
}