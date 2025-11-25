import { PrismaService } from '../prisma/prisma.service';
export declare class ConfigService {
    private prisma;
    constructor(prisma: PrismaService);
    getConfig(key: string): Promise<import("@prisma/client/runtime/library").JsonValue>;
    setConfig(key: string, value: any, description?: string): Promise<{
        id: string;
        key: string;
        description: string | null;
        updatedAt: Date;
        value: import("@prisma/client/runtime/library").JsonValue;
    }>;
    getAllConfigs(): Promise<{
        id: string;
        key: string;
        description: string | null;
        updatedAt: Date;
        value: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
}
