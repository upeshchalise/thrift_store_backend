import { PrismaProductRepository } from "../infrastructure/repository/prisma-product.repository";

export class UpdateProductService {
    constructor(private productRepository: PrismaProductRepository){}

    public async invoke(product_id: string, name: string, description: string, quantity: number, price: number, imageUrl?: string): Promise<void> {
        await this.productRepository.updateProduct(product_id, name, description, quantity, price, imageUrl)
    }
}