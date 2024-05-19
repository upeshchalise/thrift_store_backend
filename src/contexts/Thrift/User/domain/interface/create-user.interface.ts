import { UserRole } from "@prisma/client";

export interface CreateUserRequest {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    imageUrl: string | null;
    role: UserRole;
}