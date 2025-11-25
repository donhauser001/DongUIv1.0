"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('开始创建角色种子数据...');
    const roles = [
        {
            name: '超级管理员',
            key: 'SUPER_ADMIN',
            description: '拥有系统所有权限，可以管理所有用户和配置',
            isSystem: true,
        },
        {
            name: '管理员',
            key: 'ADMIN',
            description: '管理系统配置、用户管理、数据查看',
            isSystem: true,
        },
        {
            name: '教师',
            key: 'TEACHER',
            description: '管理课程、查看学生信息、发布作业',
            isSystem: true,
        },
        {
            name: '学生',
            key: 'STUDENT',
            description: '查看课程、提交作业、参与学习',
            isSystem: true,
        },
    ];
    for (const role of roles) {
        const existing = await prisma.role.findUnique({
            where: { key: role.key },
        });
        if (existing) {
            console.log(`角色 "${role.name}" 已存在，跳过创建`);
            continue;
        }
        await prisma.role.create({
            data: role,
        });
        console.log(`✅ 创建角色: ${role.name} (${role.key})`);
    }
    console.log('角色种子数据创建完成！');
}
main()
    .catch((e) => {
    console.error('创建角色种子数据失败:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-roles.js.map