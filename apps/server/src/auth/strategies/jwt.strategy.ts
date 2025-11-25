import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

export interface JwtPayload {
    sub: string;
    email: string;
    roleKey: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
        });
    }

    async validate(payload: JwtPayload) {
        // @ts-ignore
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
            include: {
                role: true,
            },
        });

        if (!user || !user.status) {
            throw new UnauthorizedException('用户不存在或已被禁用');
        }

        // 移除密码字段
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

