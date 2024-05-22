import { Product } from "@prisma/client";
import { PrismaProductRepository } from "../infrastructure/repository/prisma-product.repository";

export class GetProductByProductIdService {
    constructor(public productRepository: PrismaProductRepository) {}
    async invoke(product_id: string):  Promise<Product | null> {
        return this.productRepository.getProductsByProductId(product_id)
    }
}