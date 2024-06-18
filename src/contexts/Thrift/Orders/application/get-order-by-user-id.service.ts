import { GetOrderByUserIdRequest, GetOrderByUserIdResponse } from "../domain/interface/order-data.interface";
import { PrismaOrderRepository } from "../infrastructure/repository/prisma-orders.repository";

export class GetOrderByUserIdService {
    constructor(private orderRepository: PrismaOrderRepository) { }
    public async invoke(getActivityRequest: GetOrderByUserIdRequest): Promise<GetOrderByUserIdResponse> {
        return await this.orderRepository.getOrdersByUserId(getActivityRequest.userId)
    }
}