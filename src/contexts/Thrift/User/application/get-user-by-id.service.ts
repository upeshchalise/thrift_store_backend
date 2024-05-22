import { User } from "@prisma/client";
import { PrismaUserRepository } from "../infrastructure/repository/prisma-user.repository";

export class GetUserByIdService {
    constructor(private userRepository: PrismaUserRepository){}
    async invoke(userId: string): Promise<Partial<User> | null> {
        return this.userRepository.getUserById(userId)
    }
}