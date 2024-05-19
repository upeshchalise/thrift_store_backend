import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { IProductRepository } from "../../domain/repository/product.repository";

export class PrismaProductRepository implements IProductRepository {
    constructor(private db:PrismaClient) {}

    async createProduct(user_id:string, name: string, price: number, imageUrl: string):Promise<void> {
        const product_id = randomUUID()
        await this.db.product.create({
            data: {
                id: product_id,
                user_id,
                name,
                price,
                imageUrl
            }
        })
    }
}