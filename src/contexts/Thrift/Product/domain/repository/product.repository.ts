import { Product } from "@prisma/client"

export interface IProductRepository {
    createProduct(user_id:string, name: string, price: number, imageUrl?: string): Promise<void> 

    getProductsByUserId(userId: string): Promise<Product[]>
}