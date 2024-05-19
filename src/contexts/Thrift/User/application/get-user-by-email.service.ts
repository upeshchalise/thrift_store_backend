import { User } from "@prisma/client";
import { PrismaUserRepository } from "../infrastructure/repository/prisma-user.repository";

export class GetUserByEmailService {
    constructor(private userRepository: PrismaUserRepository){}
    async invoke(email: string): Promise<Partial<User> | null> {
        return this.userRepository.getUserByEmail(email)
    }
}