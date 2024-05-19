import { User, UserRole } from "@prisma/client";

export interface IUserRepository {
    create(email:string,password:string,first_name:string,last_name:string,role:UserRole,imageUrl?:string,) : Promise<void>

    getUserByEmail(email:string) : Promise<Partial<User> | null>
}