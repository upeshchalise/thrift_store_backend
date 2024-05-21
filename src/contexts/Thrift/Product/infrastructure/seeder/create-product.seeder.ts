import { PrismaClient } from "@prisma/client";
import { adminSeeder } from "../../../User/infrastructure/seeder/create-admin-seeder";

const seedProducts = [
    {
        id: 'a3411d80-a83e-411e-8409-17170be9899f',
        name: 'furniture',
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        quantity: 12,
        price: 10000,
        imageUrl: 'file-0d3b3ab3-d99b-43e2-ad3f-3ad59f843e6d.png'
    },
    {
        id: 'a3411d80-a83e-411e-8409-17170be9829f',
        name: 'bike',
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        quantity: 10,
        price: 100000,
        imageUrl: 'file-0d3b3ab3-d99b-43e2-ad3f-3ad59f843e6d.png'
    },
    {
        id: 'a3411d80-a83e-411e-8409-17170be9199f',
        name: 'freeze',
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore consectetur adipiscing elit sed do eiusmod tempor incididunt ut labo et dolore magna aliqua.",
        quantity: 10,
        price: 50000,
        imageUrl: 'file-0d3b3ab3-d99b-43e2-ad3f-3ad59f843e6d.png'
    },
    {
        id: 'a3431d80-a83e-411e-8409-17170be9899f',
        name: 'laptop',
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        quantity: 5,
        price: 100000,
        imageUrl: 'file-0d3b3ab3-d99b-43e2-ad3f-3ad59f843e6d.png'
    },
    {
        id: 'a3411d80-a13e-411e-8409-17170be9899f',
        name: 'sofa',
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do orem ipsum dolor sit amet consectetur adipiscing e eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        quantity: 3,
        price: 10000,
        imageUrl: 'file-0d3b3ab3-d99b-43e2-ad3f-3ad59f843e6d.png'
    },
    {
        id: 'a3411d80-a83e-411e-8469-17170be9899f',
        name: 'mototcycle',
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore consectetur adipiscing elit sed do eiusmod tempor incididunt ut labo et dolore magna aliqua.",
        quantity: 2,
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
                            description: product.description,
                            quantity: product.quantity,
                            price: product.price,
                            imageUrl: product.imageUrl
                        },
                        create: {
                            id: product.id,
                            user_id: user.id,
                            name: product.name,
                            description: product.description,
                            quantity: product.quantity,
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