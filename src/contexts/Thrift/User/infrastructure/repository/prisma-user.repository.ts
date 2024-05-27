import { PrismaClient, User, UserRole } from "@prisma/client";
import { randomUUID } from "crypto";
import { IUserRepository } from "../../domain/repository/user.repository";

export class PrismaUserRepository implements IUserRepository {
    constructor(private db: PrismaClient){}


    async create(email:string,password:string,first_name:string,last_name:string,role: UserRole, imageUrl?:string | null):Promise<void> {
        const user_id = randomUUID()
        await this.db.user.create({
            data: {
                id: user_id,
                email,
                password,
                first_name,
                last_name,
                role,
                imageUrl
            }
        })
    }

    async getUserByEmail(email:string): Promise<Partial<User> | null> {
        const user = await this.db.user.findFirst({
            where: {
                email
            }
        })
        return user ? {
            id: user.id,
            email: user.email,
            password: user.password,
            first_name: user.first_name,
            last_name: user.last_name,
            imageUrl:user.imageUrl,
            role: user.role
        } : null
    }

    async getUserById(userId:string) : Promise<Partial<User> | null> {
        return await this.db.user.findFirst({
            where: {
                id: userId
            },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                role: true,
                imageUrl: true
            }
        })
    }

    async updateUser(userId:string, first_name:string, last_name:string, imageUrl?:string) : Promise<void> {
         await this.db.user.update({
            where: {
                id: userId
            },
            data: {
                first_name,
                last_name,
                imageUrl,
                updated_at: new Date()
            }
        })
    }
}