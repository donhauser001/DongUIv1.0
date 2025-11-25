import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            role: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                key: string;
                description: string | null;
                isSystem: boolean;
            };
        } & {
            id: string;
            email: string;
            name: string;
            phone: string | null;
            password: string;
            avatar: string | null;
            gender: string | null;
            birthday: Date | null;
            address: string | null;
            bio: string | null;
            status: boolean;
            createdAt: Date;
            updatedAt: Date;
            roleId: string;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            role: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                key: string;
                description: string | null;
                isSystem: boolean;
            };
            id: string;
            email: string;
            name: string;
            phone: string | null;
            avatar: string | null;
            gender: string | null;
            birthday: Date | null;
            address: string | null;
            bio: string | null;
            status: boolean;
            createdAt: Date;
            updatedAt: Date;
            roleId: string;
        };
        token: string;
    }>;
    getProfile(user: any): Promise<{
        role: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            key: string;
            description: string | null;
            isSystem: boolean;
        };
        id: string;
        email: string;
        name: string;
        phone: string | null;
        avatar: string | null;
        gender: string | null;
        birthday: Date | null;
        address: string | null;
        bio: string | null;
        status: boolean;
        createdAt: Date;
        updatedAt: Date;
        roleId: string;
    }>;
    getCurrentUser(user: any): Promise<any>;
}
