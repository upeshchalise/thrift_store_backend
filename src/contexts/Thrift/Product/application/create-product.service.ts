import { CreateProductRequest } from "../domain/interface/create-product.interface";
import { PrismaProductRepository } from "../infrastructure/repository/prisma-product.repository";

// export class CreateProductService {
//     constructor(private productRepository: PrismaProductRepository) {}
//     public async invoke(createActivityRequest: CreateProductRequest): Promise<void> {
//         await this.productRepository.createProduct(createActivityRequest.user_id,createActivityRequest.name, createActivityRequest.price, createActivityRequest.imageUrl!)
//     }
// }


export class CreateProductService {
    constructor(private productRepository: PrismaProductRepository) {}
    async invoke(createActivityRequest: CreateProductRequest):Promise<void> {
        await this.productRepository.createProduct(createActivityRequest.user_id, createActivityRequest.name,createActivityRequest.price,createActivityRequest.imageUrl!)
    }
}