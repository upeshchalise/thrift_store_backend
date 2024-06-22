import { PrismaOrderRepository } from "../infrastructure/repository/prisma-orders.repository";

export class MarkOrderDeliveredService {
    constructor(private orderRepository: PrismaOrderRepository) { }
    public async invoke(order_id: string): Promise<any> {
        await this.orderRepository.markOrderDelivered(order_id);
    }
}