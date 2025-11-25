import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedPermissions() {
    console.log('🌱 开始初始化权限数据...');

    // 定义权限列表
    const permissions = [
        // 用户管理权限
        { name: '查看用户', key: 'user:read', resource: 'user', action: 'read', description: '查看用户列表和详情' },
        { name: '创建用户', key: 'user:create', resource: 'user', action: 'create', description: '创建新用户' },
        { name: '编辑用户', key: 'user:update', resource: 'user', action: 'update', description: '编辑用户信息' },
        { name: '删除用户', key: 'user:delete', resource: 'user', action: 'delete', description: '删除用户' },

        // 角色管理权限
        { name: '查看角色', key: 'role:read', resource: 'role', action: 'read', description: '查看角色列表和详情' },
        { name: '创建角色', key: 'role:create', resource: 'role', action: 'create', description: '创建新角色' },
        { name: '编辑角色', key: 'role:update', resource: 'role', action: 'update', description: '编辑角色信息' },
        { name: '删除角色', key: 'role:delete', resource: 'role', action: 'delete', description: '删除角色' },

        // 权限管理权限
        { name: '查看权限', key: 'permission:read', resource: 'permission', action: 'read', description: '查看权限列表' },
        { name: '分配权限', key: 'permission:assign', resource: 'permission', action: 'assign', description: '为角色分配权限' },

        // 配置管理权限
        { name: '查看配置', key: 'config:read', resource: 'config', action: 'read', description: '查看系统配置' },
        { name: '修改配置', key: 'config:update', resource: 'config', action: 'update', description: '修改系统配置' },

        // 文档管理权限
        { name: '查看文档', key: 'document:read', resource: 'document', action: 'read', description: '查看文档' },
        { name: '创建文档', key: 'document:create', resource: 'document', action: 'create', description: '创建文档' },
        { name: '编辑文档', key: 'document:update', resource: 'document', action: 'update', description: '编辑文档' },
        { name: '删除文档', key: 'document:delete', resource: 'document', action: 'delete', description: '删除文档' },
    ];

    // 创建权限
    for (const permission of permissions) {
        await prisma.permission.upsert({
            where: { key: permission.key },
            update: permission,
            create: permission,
        });
    }

    console.log(`✅ 成功创建/更新 ${permissions.length} 个权限`);

    // 为超级管理员分配所有权限
    const superAdminRole = await prisma.role.findUnique({
        where: { key: 'SUPER_ADMIN' },
    });

    if (superAdminRole) {
        const allPermissions = await prisma.permission.findMany();

        for (const permission of allPermissions) {
            await prisma.rolePermission.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: superAdminRole.id,
                        permissionId: permission.id,
                    },
                },
                update: {},
                create: {
                    roleId: superAdminRole.id,
                    permissionId: permission.id,
                },
            });
        }

        console.log(`✅ 为超级管理员分配了所有权限`);
    }

    // 为管理员分配部分权限
    const adminRole = await prisma.role.findUnique({
        where: { key: 'ADMIN' },
    });

    if (adminRole) {
        const adminPermissionKeys = [
            'user:read',
            'user:create',
            'user:update',
            'role:read',
            'config:read',
            'config:update',
            'document:read',
            'document:create',
            'document:update',
        ];

        const adminPermissions = await prisma.permission.findMany({
            where: {
                key: {
                    in: adminPermissionKeys,
                },
            },
        });

        for (const permission of adminPermissions) {
            await prisma.rolePermission.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: adminRole.id,
                        permissionId: permission.id,
                    },
                },
                update: {},
                create: {
                    roleId: adminRole.id,
                    permissionId: permission.id,
                },
            });
        }

        console.log(`✅ 为管理员分配了 ${adminPermissions.length} 个权限`);
    }

    // 为学生分配基础权限
    const studentRole = await prisma.role.findUnique({
        where: { key: 'STUDENT' },
    });

    if (studentRole) {
        const studentPermissionKeys = [
            'document:read',
            'config:read',
        ];

        const studentPermissions = await prisma.permission.findMany({
            where: {
                key: {
                    in: studentPermissionKeys,
                },
            },
        });

        for (const permission of studentPermissions) {
            await prisma.rolePermission.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: studentRole.id,
                        permissionId: permission.id,
                    },
                },
                update: {},
                create: {
                    roleId: studentRole.id,
                    permissionId: permission.id,
                },
            });
        }

        console.log(`✅ 为学生分配了 ${studentPermissions.length} 个权限`);
    }

    console.log('🎉 权限初始化完成！');
}

seedPermissions()
    .catch((e) => {
        console.error('❌ 权限初始化失败:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

