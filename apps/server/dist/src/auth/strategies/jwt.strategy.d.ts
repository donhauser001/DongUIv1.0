import { Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
export interface JwtPayload {
    sub: string;
    email: string;
    roleKey: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: JwtPayload): Promise<{
        role: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            key: string;
            description: string | null;
            isSystem: boolean;
        };
        id: string;
        email: string;
        name: string;
        phone: string | null;
        avatar: string | null;
        gender: string | null;
        birthday: Date | null;
        address: string | null;
        bio: string | null;
        roleId: string;
        status: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
