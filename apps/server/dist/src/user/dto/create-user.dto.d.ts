export declare class CreateUserDto {
    email: string;
    name: string;
    phone?: string;
    password: string;
    roleId?: string;
    avatar?: string;
    gender?: 'male' | 'female' | 'other';
    birthday?: string;
    address?: string;
    bio?: string;
}
