import { RoleService, CreateRoleDto, UpdateRoleDto } from './role.service';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
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
    create(createRoleDto: CreateRoleDto): Promise<{
        id: string;
        name: string;
        key: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        isSystem: boolean;
    }>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<{
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
