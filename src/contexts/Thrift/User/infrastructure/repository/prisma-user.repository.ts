import { PrismaClient, User, UserRole } from "@prisma/client";
import { randomUUID } from "crypto";
import { IUserRepository } from "../../domain/repository/user.repository";

export class PrismaUserRepository implements IUserRepository {
    constructor(private db: PrismaClient){}


    async create(email:string,password:string,first_name:string,last_name:string,role: UserRole, imageUrl?:string):Promise<void> {
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
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            imageUrl:user.imageUrl,
            role: user.role
        } : null
    }
}