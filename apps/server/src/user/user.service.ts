import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { createPaginatedResult, PaginatedResult } from '../common/dto/pagination.dto';
import * as bcrypt from 'bcrypt';

// bcrypt加密轮数（审计建议：至少12轮）
const SALT_ROUNDS = 12;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async findAll(params?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
    roleKey?: string;
    status?: boolean;
  }): Promise<PaginatedResult<any>> {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const sortBy = params?.sortBy || 'createdAt';
    const sortOrder = params?.sortOrder || 'desc';
    const skip = (page - 1) * limit;

    const where: any = {};

    if (params?.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { email: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    if (params?.roleKey) {
      where.role = {
        key: params.roleKey,
      };
    }

    if (params?.status !== undefined) {
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

    return createPaginatedResult(users, total, page, limit);
  }

  async findOne(id: string) {
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
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async create(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    let roleId = data.roleId;
    if (!roleId) {
      const studentRole = await this.prisma.role.findUnique({
        where: { key: 'STUDENT' },
      });
      if (!studentRole) {
        throw new BadRequestException('Default STUDENT role not found');
      }
      roleId = studentRole.id;
    }

    const role = await this.prisma.role.findUnique({
      where: { id: roleId },
    });
    if (!role) {
      throw new BadRequestException('Invalid role ID');
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

  async update(id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (data.email && data.email !== user.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    if (data.roleId) {
      const role = await this.prisma.role.findUnique({
        where: { id: data.roleId },
      });
      if (!role) {
        throw new BadRequestException('Invalid role ID');
      }
    }

    let hashedPassword: string | undefined;
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

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.role.key === 'SUPER_ADMIN') {
      throw new ConflictException('Cannot delete super admin user');
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'User deleted successfully' };
  }

  async toggleStatus(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.role.key === 'SUPER_ADMIN') {
      throw new ConflictException('Cannot disable super admin user');
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
}
