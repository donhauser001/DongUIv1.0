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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(params) {
        const page = (params === null || params === void 0 ? void 0 : params.page) || 1;
        const limit = (params === null || params === void 0 ? void 0 : params.limit) || 10;
        const sortBy = (params === null || params === void 0 ? void 0 : params.sortBy) || 'createdAt';
        const sortOrder = (params === null || params === void 0 ? void 0 : params.sortOrder) || 'desc';
        const skip = (page - 1) * limit;
        const where = {};
        if (params === null || params === void 0 ? void 0 : params.search) {
            where.OR = [
                { name: { contains: params.search, mode: 'insensitive' } },
                { email: { contains: params.search, mode: 'insensitive' } },
            ];
        }
        if (params === null || params === void 0 ? void 0 : params.roleKey) {
            where.role = {
                key: params.roleKey,
            };
        }
        if ((params === null || params === void 0 ? void 0 : params.status) !== undefined) {
            where.status = params.status;
        }
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    phone: true,
                    avatar: true,
                    gender: true,
                    birthday: true,
                    address: true,
                    bio: true,
                    roleId: true,
                    role: {
                        select: {
                            id: true,
                            name: true,
                            key: true,
                        },
                    },
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            this.prisma.user.count({ where }),
        ]);
        return (0, pagination_dto_1.createPaginatedResult)(users, total, page, limit);
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                avatar: true,
                gender: true,
                birthday: true,
                address: true,
                bio: true,
                roleId: true,
                role: {
                    select: {
                        id: true,
                        name: true,
                        key: true,
                    },
                },
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async create(data) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        let roleId = data.roleId;
        if (!roleId) {
            const studentRole = await this.prisma.role.findUnique({
                where: { key: 'STUDENT' },
            });
            if (!studentRole) {
                throw new common_1.BadRequestException('Default STUDENT role not found');
            }
            roleId = studentRole.id;
        }
        const role = await this.prisma.role.findUnique({
            where: { id: roleId },
        });
        if (!role) {
            throw new common_1.BadRequestException('Invalid role ID');
        }
        const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                phone: data.phone,
                password: hashedPassword,
                roleId: roleId,
                avatar: data.avatar,
                gender: data.gender,
                birthday: data.birthday ? new Date(data.birthday) : undefined,
                address: data.address,
                bio: data.bio,
            },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                avatar: true,
                gender: true,
                birthday: true,
                address: true,
                bio: true,
                roleId: true,
                role: {
                    select: {
                        id: true,
                        name: true,
                        key: true,
                    },
                },
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
    async update(id, data) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                role: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        if (data.email && data.email !== user.email) {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: data.email },
            });
            if (existingUser) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        if (data.roleId) {
            const role = await this.prisma.role.findUnique({
                where: { id: data.roleId },
            });
            if (!role) {
                throw new common_1.BadRequestException('Invalid role ID');
            }
        }
        let hashedPassword;
        if (data.password) {
            hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                roleId: data.roleId,
                avatar: data.avatar,
                status: data.status,
                password: hashedPassword,
                gender: data.gender,
                birthday: data.birthday ? new Date(data.birthday) : undefined,
                address: data.address,
                bio: data.bio,
            },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                avatar: true,
                gender: true,
                birthday: true,
                address: true,
                bio: true,
                roleId: true,
                role: {
                    select: {
                        id: true,
                        name: true,
                        key: true,
                    },
                },
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return updatedUser;
    }
    async delete(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                role: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        if (user.role.key === 'SUPER_ADMIN') {
            throw new common_1.ConflictException('Cannot delete super admin user');
        }
        await this.prisma.user.delete({
            where: { id },
        });
        return { message: 'User deleted successfully' };
    }
    async toggleStatus(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                role: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        if (user.role.key === 'SUPER_ADMIN') {
            throw new common_1.ConflictException('Cannot disable super admin user');
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: { status: !user.status },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                avatar: true,
                gender: true,
                birthday: true,
                address: true,
                bio: true,
                roleId: true,
                role: {
                    select: {
                        id: true,
                        name: true,
                        key: true,
                    },
                },
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return updatedUser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map