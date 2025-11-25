"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RoleService = class RoleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
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
        return roles.map(role => (Object.assign(Object.assign({}, role), { userCount: role._count.users, _count: undefined })));
    }
    async findOne(id) {
        const role = await this.prisma.role.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { users: true },
                },
            },
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID ${id} not found`);
        }
        return Object.assign(Object.assign({}, role), { userCount: role._count.users, _count: undefined });
    }
    async create(data) {
        const existing = await this.prisma.role.findUnique({
            where: { key: data.key },
        });
        if (existing) {
            throw new common_1.BadRequestException(`Role with key "${data.key}" already exists`);
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
    async update(id, data) {
        const role = await this.prisma.role.findUnique({ where: { id } });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID ${id} not found`);
        }
        if (data.key && data.key !== role.key) {
            const existing = await this.prisma.role.findUnique({
                where: { key: data.key },
            });
            if (existing) {
                throw new common_1.BadRequestException(`Role with key "${data.key}" already exists`);
            }
        }
        return this.prisma.role.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        const role = await this.prisma.role.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { users: true },
                },
            },
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID ${id} not found`);
        }
        if (role.isSystem) {
            throw new common_1.BadRequestException('System roles cannot be deleted');
        }
        if (role._count.users > 0) {
            throw new common_1.BadRequestException(`Cannot delete role with ${role._count.users} users. Please reassign users first.`);
        }
        await this.prisma.role.delete({
            where: { id },
        });
        return { message: 'Role deleted successfully' };
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoleService);
//# sourceMappingURL=role.service.js.map