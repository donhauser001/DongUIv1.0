import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsOptional,
    MinLength,
    Matches,
    IsEnum,
    IsDateString,
} from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, { message: '请输入有效的邮箱地址' })
    @IsNotEmpty({ message: '邮箱不能为空' })
    email: string;

    @IsString({ message: '用户名必须是字符串' })
    @IsNotEmpty({ message: '用户名不能为空' })
    @MinLength(2, { message: '用户名至少2个字符' })
    name: string;

    @IsOptional()
    @IsString({ message: '电话必须是字符串' })
    phone?: string;

    @IsString({ message: '密码必须是字符串' })
    @IsNotEmpty({ message: '密码不能为空' })
    @MinLength(8, { message: '密码至少8个字符' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)/, {
        message: '密码必须包含字母和数字',
    })
    password: string;

    @IsOptional()
    @IsString({ message: '角色ID必须是字符串' })
    roleId?: string;

    @IsOptional()
    @IsString({ message: '头像必须是字符串' })
    avatar?: string;

    @IsOptional()
    @IsEnum(['male', 'female', 'other'], { message: '性别只能是 male、female 或 other' })
    gender?: 'male' | 'female' | 'other';

    @IsOptional()
    @IsDateString({}, { message: '生日必须是有效的日期格式' })
    birthday?: string;

    @IsOptional()
    @IsString({ message: '地址必须是字符串' })
    address?: string;

    @IsOptional()
    @IsString({ message: '个人简介必须是字符串' })
    bio?: string;
}

