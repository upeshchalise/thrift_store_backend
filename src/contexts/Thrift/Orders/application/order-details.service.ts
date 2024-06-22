import { PrismaOrderRepository } from "../infrastructure/repository/prisma-orders.repository";

export class OrderDetailService {
    constructor(private orderRepository: PrismaOrderRepository) { }
    public async invoke(orderId: string): Promise<any> {
        return await this.orderRepository.orderDetail(orderId)
    }
}