import { UserRole } from "@prisma/client";
import { hashPassword } from "../../../../Shared/infrastructure/encryptor/encryptor";
import { PrismaUserRepository } from "../repository/prisma-user.repository";

export const adminSeeder = {
    email: 'admin@gmail.com',
    password: 'admin@@1',
    first_name: 'admin',
    last_name: 'admin',
    role: UserRole.ADMIN,
    imageUrl: 'file-2395a7b9-1d18-4f7c-8127-8957f03d07ff.png'
}

export class CreateAdminSeeder {
    constructor(private userRepository: PrismaUserRepository){}
    public async addAdminSeeder(): Promise<void> {
        try {
            const isAdminExist = await this.userRepository.getUserByEmail(adminSeeder.email) !== null;
            if(!isAdminExist) {
                const hashedPassword =  hashPassword(adminSeeder.password)
                await this.userRepository.create(adminSeeder.email, hashedPassword, adminSeeder.first_name, adminSeeder.last_name, adminSeeder.role,adminSeeder.imageUrl)
            }
        } catch (error) {
            console.log(error)
        }
    }
}