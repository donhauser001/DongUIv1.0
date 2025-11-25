import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, Max, IsString, IsIn } from 'class-validator';

export class PaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: '页码必须是整数' })
    @Min(1, { message: '页码至少为1' })
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: '每页数量必须是整数' })
    @Min(1, { message: '每页至少1条' })
    @Max(100, { message: '每页最多100条' })
    limit?: number = 10;

    @IsOptional()
    @IsString({ message: '排序字段必须是字符串' })
    sortBy?: string = 'createdAt';

    @IsOptional()
    @IsIn(['asc', 'desc'], { message: '排序方向只能是 asc 或 desc' })
    sortOrder?: 'asc' | 'desc' = 'desc';
}

export interface PaginatedResult<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export function createPaginatedResult<T>(
    items: T[],
    total: number,
    page: number,
    limit: number,
): PaginatedResult<T> {
    const totalPages = Math.ceil(total / limit);

    return {
        items,
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
    };
}

