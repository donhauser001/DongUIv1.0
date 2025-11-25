import {
    Injectable,
    UnauthorizedException,
    ConflictException,
    BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const { email, name, password } = registerDto;

        // 检查邮箱是否已存在
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('该邮箱已被注册');
        }

        // 获取学生角色（默认角色）
        const studentRole = await this.prisma.role.findUnique({
            where: { key: 'STUDENT' },
        });

        if (!studentRole) {
            throw new BadRequestException('系统角色未初始化，请联系管理员');
        }

        // 加密密码（使用12轮加盐）
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 创建用户
        // @ts-ignore
        const user = await this.prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: {
                    connect: {
                        id: studentRole.id,
                    },
                },
                status: true,
            },
            include: {
                role: true,
            },
        });

        // 生成JWT Token
        const token = this.generateToken(user.id, user.email, user.role.key);

        return {
            user,
            token,
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // 查找用户
        // @ts-ignore
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: {
                role: true,
            },
        });

        if (!user) {
            throw new UnauthorizedException('邮箱或密码错误');
        }

        // 检查用户是否被禁用
        if (!user.status) {
            throw new UnauthorizedException('该账户已被禁用');
        }

        // 验证密码
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('邮箱或密码错误');
        }

        // 移除密码字段
        const { password: _, ...userWithoutPassword } = user;

        // 生成JWT Token
        const token = this.generateToken(user.id, user.email, user.role.key);

        return {
            user: userWithoutPassword,
            token,
        };
    }

    async getProfile(userId: string) {
        // @ts-ignore
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                role: true,
            },
        });

        if (!user) {
            throw new UnauthorizedException('用户不存在');
        }

        // 移除密码字段
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    private generateToken(userId: string, email: string, roleKey: string): string {
        const payload = {
            sub: userId,
            email,
            roleKey,
        };

        return this.jwtService.sign(payload);
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: { role: true },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            const { password: _, ...result } = user;
            return result;
        }

        return null;
    }
}

