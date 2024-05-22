import { PrismaUserRepository } from "../infrastructure/repository/prisma-user.repository";

export class UpdateUserService {
    constructor(private userRepository: PrismaUserRepository){}

    async invoke(email: string, first_name: string, last_name: string, imageUrl?: string): Promise<void> {
        await this.userRepository.updateUser(email, first_name, last_name, imageUrl)
    }
}