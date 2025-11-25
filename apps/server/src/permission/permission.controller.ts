import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('permissions')
@UseGuards(RolesGuard)
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Get()
    @Roles('ADMIN', 'SUPER_ADMIN')
    async findAll() {
        return this.permissionService.findAll();
    }

    @Get('role/:roleId')
    @Roles('ADMIN', 'SUPER_ADMIN')
    async findByRole(@Param('roleId') roleId: string) {
        return this.permissionService.findByRole(roleId);
    }

    @Get('my')
    async getMyPermissions(@CurrentUser() user: any) {
        return this.permissionService.getUserPermissions(user.id);
    }

    @Post('assign')
    @Roles('SUPER_ADMIN')
    async assignPermissions(
        @Body() body: { roleId: string; permissionIds: string[] },
    ) {
        return this.permissionService.assignPermissionsToRole(
            body.roleId,
            body.permissionIds,
        );
    }

    @Post('check')
    async checkPermission(
        @CurrentUser() user: any,
        @Body() body: { permission: string },
    ) {
        const hasPermission = await this.permissionService.checkPermission(
            user.id,
            body.permission,
        );
        return { hasPermission };
    }
}

