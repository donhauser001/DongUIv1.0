import { apiClient } from './client'

export interface Role {
    id: string
    name: string
    key: string
    description?: string
    isSystem: boolean
    userCount: number
    createdAt: string
    updatedAt: string
}

export interface CreateRoleDto {
    name: string
    key: string
    description?: string
}

export interface UpdateRoleDto {
    name?: string
    key?: string
    description?: string
}

// 获取所有角色
export async function getRoles(): Promise<Role[]> {
    return apiClient.get('/roles')
}

// 获取单个角色
export async function getRoleById(id: string): Promise<Role> {
    return apiClient.get(`/roles/${id}`)
}

// 创建角色
export async function createRole(data: CreateRoleDto): Promise<Role> {
    return apiClient.post('/roles', data)
}

// 更新角色
export async function updateRole(id: string, data: UpdateRoleDto): Promise<Role> {
    return apiClient.put(`/roles/${id}`, data)
}

// 删除角色
export async function deleteRole(id: string): Promise<void> {
    return apiClient.delete(`/roles/${id}`)
}
