"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 开始创建种子数据...');
    const defaultPassword = await bcrypt.hash('password123', 10);
    const superAdmin = await prisma.user.upsert({
        where: { email: 'admin@dong.com' },
        update: {},
        create: {
            email: 'admin@dong.com',
            name: '超级管理员',
            password: defaultPassword,
            role: 'SUPER_ADMIN',
            status: true,
        },
    });
    console.log('✅ 创建超级管理员:', superAdmin.email);
    const admin = await prisma.user.upsert({
        where: { email: 'manager@dong.com' },
        update: {},
        create: {
            email: 'manager@dong.com',
            name: '系统管理员',
            password: defaultPassword,
            role: 'ADMIN',
            status: true,
        },
    });
    console.log('✅ 创建管理员:', admin.email);
    const teachers = [
        {
            email: 'teacher1@dong.com',
            name: '张老师',
            role: 'TEACHER',
        },
        {
            email: 'teacher2@dong.com',
            name: '李老师',
            role: 'TEACHER',
        },
        {
            email: 'teacher3@dong.com',
            name: '王老师',
            role: 'TEACHER',
        },
    ];
    for (const teacher of teachers) {
        const user = await prisma.user.upsert({
            where: { email: teacher.email },
            update: {},
            create: Object.assign(Object.assign({}, teacher), { password: defaultPassword, status: true }),
        });
        console.log('✅ 创建教师:', user.email);
    }
    const students = [
        {
            email: 'student1@dong.com',
            name: '小明',
            role: 'STUDENT',
        },
        {
            email: 'student2@dong.com',
            name: '小红',
            role: 'STUDENT',
        },
        {
            email: 'student3@dong.com',
            name: '小刚',
            role: 'STUDENT',
        },
        {
            email: 'student4@dong.com',
            name: '小丽',
            role: 'STUDENT',
        },
        {
            email: 'student5@dong.com',
            name: '小华',
            role: 'STUDENT',
        },
    ];
    for (const student of students) {
        const user = await prisma.user.upsert({
            where: { email: student.email },
            update: {},
            create: Object.assign(Object.assign({}, student), { password: defaultPassword, status: true }),
        });
        console.log('✅ 创建学生:', user.email);
    }
    const disabledUser = await prisma.user.upsert({
        where: { email: 'disabled@dong.com' },
        update: {},
        create: {
            email: 'disabled@dong.com',
            name: '已禁用用户',
            password: defaultPassword,
            role: 'STUDENT',
            status: false,
        },
    });
    console.log('✅ 创建禁用用户:', disabledUser.email);
    const total = await prisma.user.count();
    const byRole = await prisma.user.groupBy({
        by: ['role'],
        _count: true,
    });
    console.log('\n📊 用户统计:');
    console.log(`总用户数: ${total}`);
    byRole.forEach((item) => {
        const roleNames = {
            SUPER_ADMIN: '超级管理员',
            ADMIN: '管理员',
            TEACHER: '教师',
            STUDENT: '学生',
        };
        console.log(`${roleNames[item.role]}: ${item._count}`);
    });
    console.log('\n🎉 种子数据创建完成！');
    console.log('\n🔑 默认登录信息:');
    console.log('邮箱: admin@dong.com (超级管理员)');
    console.log('邮箱: manager@dong.com (管理员)');
    console.log('邮箱: teacher1@dong.com (教师)');
    console.log('邮箱: student1@dong.com (学生)');
    console.log('密码: password123 (所有用户统一密码)');
}
main()
    .catch((e) => {
    console.error('❌ 种子数据创建失败:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map