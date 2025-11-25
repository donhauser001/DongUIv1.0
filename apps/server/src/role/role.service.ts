import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

@Injectable()
export class RoleService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        const roles = await this.prisma.role.findMany({
            include: {
                _count: {
                    select: { users: true },
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        return roles.map(role => ({
            ...role,
            userCount: role._count.users,
            _count: undefined,
        }));
    }

    async findOne(id: string) {
        const role = await this.prisma.role.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { users: true },
                },
            },
        });

        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }

        return {
            ...role,
            userCount: role._count.users,
            _count: undefined,
        };
    }

    async create(data: CreateRoleDto) {
        // 检查 key 是否已存在
        const existing = await this.prisma.role.findUnique({
            where: { key: data.key },
        });

        if (existing) {
            throw new BadRequestException(`Role with key "${data.key}" already exists`);
        }

        return this.prisma.role.create({
            data: {
                name: data.name,
                key: data.key,
                description: data.description,
                isSystem: false,
            },
        });
    }

    async update(id: string, data: UpdateRoleDto) {
        const role = await this.prisma.role.findUnique({ where: { id } });

        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }

        // 如果更新 key，检查是否与其他角色冲突
        if (data.key && data.key !== role.key) {
            const existing = await this.prisma.role.findUnique({
                where: { key: data.key },
            });

            if (existing) {
                throw new BadRequestException(`Role with key "${data.key}" already exists`);
            }
        }

        return this.prisma.role.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        const role = await this.prisma.role.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { users: true },
                },
            },
        });

        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }

        // 系统角色不可删除
        if (role.isSystem) {
            throw new BadRequestException('System roles cannot be deleted');
        }

        // 如果有用户使用此角色，不允许删除
        if (role._count.users > 0) {
            throw new BadRequestException(`Cannot delete role with ${role._count.users} users. Please reassign users first.`);
        }

        await this.prisma.role.delete({
            where: { id },
        });

        return { message: 'Role deleted successfully' };
    }
}

