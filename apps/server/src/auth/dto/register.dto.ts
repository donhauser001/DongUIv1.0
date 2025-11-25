import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
    @IsEmail({}, { message: '请输入有效的邮箱地址' })
    @IsNotEmpty({ message: '邮箱不能为空' })
    email: string;

    @IsString({ message: '用户名必须是字符串' })
    @IsNotEmpty({ message: '用户名不能为空' })
    @MinLength(2, { message: '用户名至少2个字符' })
    name: string;

    @IsString({ message: '密码必须是字符串' })
    @IsNotEmpty({ message: '密码不能为空' })
    @MinLength(8, { message: '密码至少8个字符' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)/, {
        message: '密码必须包含字母和数字',
    })
    password: string;
}

