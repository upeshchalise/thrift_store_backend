export interface CreateProductRequest {
    user_id: string,
    name: string,
    price: number,
    imageUrl: string | null
}