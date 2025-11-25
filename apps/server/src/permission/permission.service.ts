import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.permission.findMany({
            orderBy: { resource: 'asc' },
        });
    }

    async findByRole(roleId: string) {
        const rolePermissions = await this.prisma.rolePermission.findMany({
            where: { roleId },
            include: {
                permission: true,
            },
        });

        return rolePermissions.map((rp) => rp.permission);
    }

    async assignPermissionsToRole(roleId: string, permissionIds: string[]) {
        // 检查角色是否存在
        const role = await this.prisma.role.findUnique({
            where: { id: roleId },
        });

        if (!role) {
            throw new NotFoundException('角色不存在');
        }

        // 删除角色的所有现有权限
        await this.prisma.rolePermission.deleteMany({
            where: { roleId },
        });

        // 分配新权限
        const rolePermissions = permissionIds.map((permissionId) => ({
            roleId,
            permissionId,
        }));

        await this.prisma.rolePermission.createMany({
            data: rolePermissions,
            skipDuplicates: true,
        });

        return this.findByRole(roleId);
    }

    async checkPermission(userId: string, permissionKey: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                role: {
                    include: {
                        permissions: {
                            include: {
                                permission: true,
                            },
                        },
                    },
                },
            },
        });

        if (!user) {
            return false;
        }

        // 检查用户的角色是否有该权限
        const hasPermission = user.role.permissions.some(
            (rp) => rp.permission.key === permissionKey,
        );

        return hasPermission;
    }

    async getUserPermissions(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                role: {
                    include: {
                        permissions: {
                            include: {
                                permission: true,
                            },
                        },
                    },
                },
            },
        });

        if (!user) {
            return [];
        }

        return user.role.permissions.map((rp) => rp.permission);
    }
}

