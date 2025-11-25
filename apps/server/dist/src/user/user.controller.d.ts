import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(page?: string, limit?: string, sortBy?: string, sortOrder?: 'asc' | 'desc', search?: string, roleKey?: string, status?: string): Promise<import("../common/dto/pagination.dto").PaginatedResult<any>>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        roleId: string;
        role: {
            id: string;
            name: string;
            key: string;
        };
        email: string;
        phone: string;
        avatar: string;
        gender: string;
        birthday: Date;
        address: string;
        bio: string;
        status: boolean;
    }>;
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        roleId: string;
        role: {
            id: string;
            name: string;
            key: string;
        };
        email: string;
        phone: string;
        avatar: string;
        gender: string;
        birthday: Date;
        address: string;
        bio: string;
        status: boolean;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        roleId: string;
        role: {
            id: string;
            name: string;
            key: string;
        };
        email: string;
        phone: string;
        avatar: string;
        gender: string;
        birthday: Date;
        address: string;
        bio: string;
        status: boolean;
    }>;
    toggleStatus(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        roleId: string;
        role: {
            id: string;
            name: string;
            key: string;
        };
        email: string;
        phone: string;
        avatar: string;
        gender: string;
        birthday: Date;
        address: string;
        bio: string;
        status: boolean;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
