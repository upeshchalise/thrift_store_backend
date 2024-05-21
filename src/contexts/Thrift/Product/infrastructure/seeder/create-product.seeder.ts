import { PrismaClient } from "@prisma/client";
import { adminSeeder } from "../../../User/infrastructure/seeder/create-admin-seeder";

const seedProducts = [
    {
        id: 'a3411d80-a83e-411e-8409-17170be9899f',
        name: 'furniture',
        price: 10000,
        imageUrl: 'file-0d3b3ab3-d99b-43e2-ad3f-3ad59f843e6d.png'
    },
    {
        id: 'a3411d80-a83e-411e-8409-17170be9829f',
        name: 'bike',
        price: 100000,
        imageUrl: 'file-0d3b3ab3-d99b-43e2-ad3f-3ad59f843e6d.png'
    },
    {
        id: 'a3411d80-a83e-411e-8409-17170be9199f',
        name: 'freeze',
        price: 50000,
        imageUrl: 'file-0d3b3ab3-d99b-43e2-ad3f-3ad59f843e6d.png'
    },
    {
        id: 'a3431d80-a83e-411e-8409-17170be9899f',
        name: 'laptop',
        price: 100000,
        imageUrl: 'file-0d3b3ab3-d99b-43e2-ad3f-3ad59f843e6d.png'
    },
    {
        id: 'a3411d80-a13e-411e-8409-17170be9899f',
        name: 'sofa',
        price: 10000,
        imageUrl: 'file-0d3b3ab3-d99b-43e2-ad3f-3ad59f843e6d.png'
    },
    {
        id: 'a3411d80-a83e-411e-8469-17170be9899f',
        name: 'mototcycle',
        price: 100,
        imageUrl: 'file-0d3b3ab3-d99b-43e2-ad3f-3ad59f843e6d.png'
    },
]

export class CreateProductSeeder {
    constructor(private db: PrismaClient){}

    public async seedProducts(): Promise<void> {
        try {
            const user = await this.db.user.findUnique({
                where: {
                    email: adminSeeder.email
                },
                select: {
                    id: true
                }
            });

            if (!user) return;
            const products = seedProducts;
            await Promise.all(
                products.map(async product => {

                    await this.db.product.upsert({
                        where: {
                            id: product.id
                        },
                        update: {
                            user_id: user.id,
                            name: product.name,
                            price: product.price,
                            imageUrl: product.imageUrl
                        },
                        create: {
                            id: product.id,
                            user_id: user.id,
                            name: product.name,
                            price: product.price,
                            imageUrl: product.imageUrl
                        }
                    });
                })
            );
        } catch (error) {
            console.log(error);
        }
    }
}