import { Product } from "@prisma/client";
import { PaginationResult } from "../domain/interface/create-product.interface";
import { PrismaProductRepository } from "../infrastructure/repository/prisma-product.repository";

export class GetProductsByUserIdService {
    constructor(private productRepository: PrismaProductRepository) {}
    async invoke(userId: string,page:number,pageSize:number,search:string):  Promise<PaginationResult<Product>> {
        console.log(search,'search');
        return this.productRepository.getProductsByUserId(userId,page,pageSize,search)
    }
}