import { PrismaClient, Product } from "@prisma/client";
import { randomUUID } from "crypto";
import { PaginationMeta, PaginationResult } from "../../domain/interface/create-product.interface";
import { IProductRepository } from "../../domain/repository/product.repository";

export class PrismaProductRepository implements IProductRepository {
    constructor(private db:PrismaClient) {}

    async createProduct(user_id:string, name: string, description: string, quantity: number, price: number, imageUrl?: string | null):Promise<void> {
        const product_id = randomUUID()
        await this.db.product.create({
            data: {
                id: product_id,
                user_id,
                name,
                description,
                quantity,
                price,
                imageUrl
            }
        })
    }

    async getProductsByUserId(userId:string,page:number =1,pageSize:number = 10, search:string ='') : Promise<PaginationResult<Product>> {
        let totalCount: number;
console.log("object", search);
    const newPageSize = pageSize || 10;
    const newPage = page || 1;
    const skip = newPageSize * (newPage - 1);
        const response = await this.db.product.findMany({
            where: {
                AND: [
                    {user_id: userId},
                    search ? {
                    OR : [
                        {name: {contains: search, mode: 'insensitive'}},
                        {description: {contains: search, mode: 'insensitive'}},
                        // {quantity: Number(search)},
                        // {price: Number(search)},
                    ]
                    } : {},
                ],
                deleted_at: null
            },
            orderBy: {
                created_at: 'desc'
            },
            skip,
            take: newPageSize
        })
    //  console.log('page: ', page, 'pagesize: ', pageSize, 'search: ', search);
        totalCount = await this.db.product.count({
            where: {
                AND: [
                    {user_id: userId},
                    search ? {
                    OR : [
                        {name: {contains: search, mode: 'insensitive'}},
                        {description: {contains: search, mode: 'insensitive'}},
                        // {quantity: Number(search)},
                        // {price: Number(search)},
                    ]
                    } : {}
                ],
                deleted_at: null
            }
        });
        const totalPages = Math.ceil(totalCount / newPageSize);
    const lastPage = totalPages;
    const currentPage = newPage;
    const perPage = newPageSize;
    const prev = newPage > 1 ? newPage - 1 : null;
    const next = newPage < lastPage ? newPage + 1 : null;
    const meta: PaginationMeta = {
        total: totalCount,
        lastPage,
        currentPage,
        perPage,
        prev,
        next
      };
        return {meta, data: response}
    }

  async getProductsByProductId(product_id: string): Promise<Product | null> {
    return this.db.product.findFirst({
        where: {
            id: product_id,
            deleted_at: null
        },
        include: {
            user: {
                select: {
                    first_name: true,
                    last_name:true,
                    email: true,
                    imageUrl: true,
                    id:true
                }
            }
        },
    })
  }

   async updateProduct(product_id: string, name: string, description: string, quantity: number, price: number, imageUrl?: string | undefined): Promise<void> {
    await this.db.product.update({
        where: {
            id: product_id
        },
        data: {
            name,
            description,
            quantity,
            price,
            imageUrl,
            updated_at: new Date()
        }
    })
  }

  async deleteProduct(product_id: string): Promise<void> {
    await this.db.product.update({
        where: {
            id: product_id
        },
        data: {
            deleted_at: new Date()
        }
    })
  }


//   all products
async getAllProducts(page:number =1,pageSize:number = 10, search:string ='') : Promise<PaginationResult<Product>> {
    let totalCount: number;
console.log("object", search);
const newPageSize = pageSize || 10;
const newPage = page || 1;
const skip = newPageSize * (newPage - 1);
    const response = await this.db.product.findMany({
        where: {
            AND: [
                search ? {
                OR : [
                    {name: {contains: search, mode: 'insensitive'}},
                    {description: {contains: search, mode: 'insensitive'}},
                    // {quantity: Number(search)},
                    // {price: Number(search)},
                ]
                } : {},
            ],
            deleted_at: null
        },
        orderBy: {
            created_at: 'desc'
        },
        skip,
        take: newPageSize
    })
//  console.log('page: ', page, 'pagesize: ', pageSize, 'search: ', search);
    totalCount = await this.db.product.count({
        where: {
            AND: [
                search ? {
                OR : [
                    {name: {contains: search, mode: 'insensitive'}},
                    {description: {contains: search, mode: 'insensitive'}},
                    // {quantity: Number(search)},
                    // {price: Number(search)},
                ]
                } : {}
            ],
            deleted_at: null
        }
    });
    const totalPages = Math.ceil(totalCount / newPageSize);
const lastPage = totalPages;
const currentPage = newPage;
const perPage = newPageSize;
const prev = newPage > 1 ? newPage - 1 : null;
const next = newPage < lastPage ? newPage + 1 : null;
const meta: PaginationMeta = {
    total: totalCount,
    lastPage,
    currentPage,
    perPage,
    prev,
    next
  };
    return {meta, data: response}
}
}