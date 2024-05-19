import { CreateUserRequest } from "../domain/interface/create-user.interface";
import { PrismaUserRepository } from "../infrastructure/repository/prisma-user.repository";

export class CreateUserService {
    constructor(private userRepository: PrismaUserRepository){}
    public async invoke(createActivityRequest: CreateUserRequest):Promise<void> {
        await this.userRepository.create(createActivityRequest.email,createActivityRequest.password,createActivityRequest.first_name,createActivityRequest.last_name,createActivityRequest.role, createActivityRequest.imageUrl)
    }
}