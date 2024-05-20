import { PrismaClient, Product } from "@prisma/client";
import { randomUUID } from "crypto";
import { IProductRepository } from "../../domain/repository/product.repository";

export class PrismaProductRepository implements IProductRepository {
    constructor(private db:PrismaClient) {}

    async createProduct(user_id:string, name: string, price: number, imageUrl?: string | null):Promise<void> {
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

    async getProductsByUserId(userId:string) : Promise<Product[]> {
        const response = await this.db.product.findMany({
            where: {
                user_id: userId
            }
        })
        console.log(response);
        return response
    }
}