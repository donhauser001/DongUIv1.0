import { PermissionService } from './permission.service';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
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
    getMyPermissions(user: any): Promise<{
        id: string;
        name: string;
        key: string;
        resource: string;
        action: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    assignPermissions(body: {
        roleId: string;
        permissionIds: string[];
    }): Promise<{
        id: string;
        name: string;
        key: string;
        resource: string;
        action: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    checkPermission(user: any, body: {
        permission: string;
    }): Promise<{
        hasPermission: boolean;
    }>;
}
