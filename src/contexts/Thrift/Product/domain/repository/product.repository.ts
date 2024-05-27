import { Product } from "@prisma/client";
import { PaginationResult } from "../interface/create-product.interface";

export interface IProductRepository {
    createProduct(user_id:string, name: string,description: string, quantity: number, price: number, imageUrl?: string): Promise<void> 

    getProductsByUserId(userId: string,page:number,pageSize:number, search:string):  Promise<PaginationResult<Product>>

    getProductsByProductId(product_id: string): Promise<Product | null>;

    updateProduct(product_id: string, name: string, description: string, quantity: number, price: number, imageUrl?: string): Promise<void>;

    deleteProduct(product_id: string): Promise<void>;

     getAllProducts(page:number,pageSize:number, search:string) : Promise<PaginationResult<Product>>;
}