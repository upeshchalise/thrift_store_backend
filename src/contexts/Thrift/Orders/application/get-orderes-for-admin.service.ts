import { GetOrderByUserIdResponse } from "../domain/interface/order-data.interface";
import { PrismaOrderRepository } from "../infrastructure/repository/prisma-orders.repository";

export class GetOrderForAdminService {
    constructor(private orderRepository: PrismaOrderRepository) { }
    public async invoke(): Promise<GetOrderByUserIdResponse | null> {
        return await this.orderRepository.getAllOrdersForAdmin();
    }
}