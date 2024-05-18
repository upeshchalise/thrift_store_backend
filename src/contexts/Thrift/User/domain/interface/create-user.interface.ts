import { UserRole } from "@prisma/client";

export interface CreateUserRequest {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    imageUrl: string;
    role: UserRole;
}