import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('开始创建用户种子数据...');

    // 获取角色
    const superAdminRole = await prisma.role.findUnique({ where: { key: 'SUPER_ADMIN' } });
    const adminRole = await prisma.role.findUnique({ where: { key: 'ADMIN' } });
    const teacherRole = await prisma.role.findUnique({ where: { key: 'TEACHER' } });
    const studentRole = await prisma.role.findUnique({ where: { key: 'STUDENT' } });

    if (!superAdminRole || !adminRole || !teacherRole || !studentRole) {
        console.error('❌ 角色不存在，请先运行 seed-roles.ts');
        process.exit(1);
    }

    // 创建测试用户
    const users = [
        {
            email: 'admin@example.com',
            name: '超级管理员',
            password: await bcrypt.hash('admin123', 10),
            roleId: superAdminRole.id,
            status: true,
        },
        {
            email: 'teacher@example.com',
            name: '张老师',
            password: await bcrypt.hash('teacher123', 10),
            roleId: teacherRole.id,
            status: true,
        },
        {
            email: 'student@example.com',
            name: '李同学',
            password: await bcrypt.hash('student123', 10),
            roleId: studentRole.id,
            status: true,
        },
    ];

    for (const userData of users) {
        const existing = await prisma.user.findUnique({
            where: { email: userData.email },
        });

        if (existing) {
            console.log(`用户 "${userData.name}" (${userData.email}) 已存在，跳过创建`);
            continue;
        }

        await prisma.user.create({
            data: userData,
        });

        console.log(`✅ 创建用户: ${userData.name} (${userData.email})`);
    }

    console.log('\n用户种子数据创建完成！');
    console.log('\n测试账号：');
    console.log('超级管理员: admin@example.com / admin123');
    console.log('教师: teacher@example.com / teacher123');
    console.log('学生: student@example.com / student123');
}

main()
    .catch((e) => {
        console.error('创建用户种子数据失败:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

