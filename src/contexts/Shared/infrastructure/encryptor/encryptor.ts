import * as bcrypt from "bcrypt";

export const hashPassword = (password: string): string => {
    const hash = bcrypt.hashSync(password, Number(process.env.SALT_ROUND || '10'));
    return hash
}

export const comparePassword = (password: string, hash:string): boolean => {
    return bcrypt.compareSync(password,hash);
}