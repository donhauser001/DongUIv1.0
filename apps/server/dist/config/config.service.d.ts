import { PrismaService } from '../prisma/prisma.service';
export declare class ConfigService {
    private prisma;
    constructor(prisma: PrismaService);
    getConfig(key: string): Promise<import("@prisma/client/runtime/library").JsonValue>;
    setConfig(key: string, value: any, description?: string): Promise<{
        id: string;
        key: string;
        value: import("@prisma/client/runtime/library").JsonValue;
        description: string | null;
        updatedAt: Date;
    }>;
    getAllConfigs(): Promise<{
        id: string;
        key: string;
        value: import("@prisma/client/runtime/library").JsonValue;
        description: string | null;
        updatedAt: Date;
    }[]>;
}
