import { IMakeOrderRequest } from "../domain/interface/make-order-interface";
import { PrismaOrderRepository } from "../infrastructure/repository/prisma-orders.repository";

export class MakeOrderService {
    constructor(private orderRepository: PrismaOrderRepository) { }
    public async invoke(createActivityRequest: IMakeOrderRequest): Promise<void> {
        await this.orderRepository.makeOrder(createActivityRequest.userId, createActivityRequest.total_amount, createActivityRequest.status, createActivityRequest.destination, createActivityRequest.order_items)
    }
}