import { PrismaProductRepository } from "../infrastructure/repository/prisma-product.repository";

export class DeleteProductService {
    constructor(private productRepository: PrismaProductRepository){}

    public async invoke(product_id: string): Promise<void> {
        await this.productRepository.deleteProduct(product_id)
    }
}