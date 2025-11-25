import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginatedResult } from '../common/dto/pagination.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(params?: {
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
        search?: string;
        roleKey?: string;
        status?: boolean;
    }): Promise<PaginatedResult<any>>;
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
    create(data: CreateUserDto): Promise<{
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
    update(id: string, data: UpdateUserDto): Promise<{
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
}
