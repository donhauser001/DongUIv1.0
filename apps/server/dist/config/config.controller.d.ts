import { ConfigService } from './config.service';
export declare class ConfigController {
    private readonly configService;
    constructor(configService: ConfigService);
    getConfig(key: string): Promise<import("@prisma/client/runtime/library").JsonValue>;
    setConfig(body: {
        key: string;
        value: any;
        description?: string;
    }): Promise<{
        id: string;
        key: string;
        value: import("@prisma/client/runtime/library").JsonValue;
        description: string | null;
        updatedAt: Date;
    }>;
}
