import { PrismaService } from '../prisma/prisma.service';
export interface CreateRoleDto {
    name: string;
    key: string;
    description?: string;
}
export interface UpdateRoleDto {
    name?: string;
    key?: string;
    description?: string;
}
export declare class RoleService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        userCount: number;
        _count: any;
        id: string;
        name: string;
        key: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isSystem: boolean;
    }[]>;
    findOne(id: string): Promise<{
        userCount: number;
        _count: any;
        id: string;
        name: string;
        key: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isSystem: boolean;
    }>;
    create(data: CreateRoleDto): Promise<{
        id: string;
        name: string;
        key: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isSystem: boolean;
    }>;
    update(id: string, data: UpdateRoleDto): Promise<{
        id: string;
        name: string;
        key: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isSystem: boolean;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
