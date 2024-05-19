export interface IProductRepository {
    createProduct(id:string,user_id:string, name: string, price: number, imageUrl: string): Promise<void> 
}