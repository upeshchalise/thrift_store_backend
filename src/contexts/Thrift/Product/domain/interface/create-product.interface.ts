export interface CreateProductRequest {
    user_id: string,
    name: string,
    description: string,
    quantity: number,
    price: number,
    imageUrl: string | null
}

export interface PaginationMeta {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  }
  
  export interface PaginationResult<T> {
    meta: PaginationMeta;
    data: T[];
  }