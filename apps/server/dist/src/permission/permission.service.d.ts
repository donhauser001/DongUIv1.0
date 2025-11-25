import { PrismaService } from '../prisma/prisma.service';
export declare class PermissionService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string;
        key: string;
        resource: string;
        action: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findByRole(roleId: string): Promise<{
        id: string;
        name: string;
        key: string;
        resource: string;
        action: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    assignPermissionsToRole(roleId: string, permissionIds: string[]): Promise<{
        id: string;
        name: string;
        key: string;
        resource: string;
        action: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    checkPermission(userId: string, permissionKey: string): Promise<boolean>;
    getUserPermissions(userId: string): Promise<{
        id: string;
        name: string;
        key: string;
        resource: string;
        action: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
