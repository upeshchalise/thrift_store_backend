import { Product } from "@prisma/client";
import { PrismaProductRepository } from "../infrastructure/repository/prisma-product.repository";

export class GetProductsByUserIdService {
    constructor(private productRepository: PrismaProductRepository) {}
    async invoke(userId: string): Promise<Product[]> {
        return this.productRepository.getProductsByUserId(userId)
    }
}