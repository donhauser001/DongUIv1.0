import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { RoleService, CreateRoleDto, UpdateRoleDto } from './role.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('roles')
@UseGuards(RolesGuard)
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Get()
    @Roles('ADMIN', 'SUPER_ADMIN')
    findAll() {
        return this.roleService.findAll();
    }

    @Get(':id')
    @Roles('ADMIN', 'SUPER_ADMIN')
    findOne(@Param('id') id: string) {
        return this.roleService.findOne(id);
    }

    @Post()
    @Roles('SUPER_ADMIN')
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create(createRoleDto);
    }

    @Put(':id')
    @Roles('SUPER_ADMIN')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.roleService.update(id, updateRoleDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles('SUPER_ADMIN')
    delete(@Param('id') id: string) {
        return this.roleService.delete(id);
    }
}

