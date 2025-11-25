import { apiClient } from './client';

const API_BASE = '/users';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  gender?: 'male' | 'female' | 'other';
  birthday?: string;
  address?: string;
  bio?: string;
  roleId: string;
  role: {
    id: string;
    name: string;
    key: string;
  };
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  email: string;
  name: string;
  phone?: string;
  password: string;
  roleId?: string; // 改为 roleId
  avatar?: string;
  gender?: 'male' | 'female' | 'other';
  birthday?: string;
  address?: string;
  bio?: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  phone?: string;
  roleId?: string; // 改为 roleId
  avatar?: string | null;
  status?: boolean;
  password?: string;
  gender?: 'male' | 'female' | 'other';
  birthday?: string;
  address?: string;
  bio?: string;
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  byRole: Array<{ role: string; count: number }>;
}

// 获取所有用户
export async function getUsers(params?: {
  search?: string;
  role?: string;
  status?: boolean;
}): Promise<User[]> {
  const query = new URLSearchParams();
  if (params?.search) query.append('search', params.search);
  if (params?.role) query.append('roleKey', params.role);
  if (params?.status !== undefined) query.append('status', String(params.status));

  const url = query.toString() ? `${API_BASE}?${query}` : API_BASE;
  const response: any = await apiClient.get(url);

  // 如果返回的是分页对象，提取items数组
  if (response && response.items) {
    return response.items;
  }

  // 否则返回原始响应（向后兼容）
  return response;
}

// 获取单个用户
export async function getUser(id: string): Promise<User> {
  return apiClient.get(`${API_BASE}/${id}`);
}

// 别名，保持向后兼容
export const getUserById = getUser;

// 创建用户
export async function createUser(data: CreateUserDto): Promise<User> {
  return apiClient.post(API_BASE, data);
}

// 更新用户
export async function updateUser(id: string, data: UpdateUserDto): Promise<User> {
  return apiClient.put(`${API_BASE}/${id}`, data);
}

// 切换用户状态
export async function toggleUserStatus(id: string): Promise<User> {
  return apiClient.patch(`${API_BASE}/${id}/toggle-status`);
}

// 删除用户
export async function deleteUser(id: string): Promise<{ message: string }> {
  return apiClient.delete(`${API_BASE}/${id}`);
}

// 获取用户统计
export async function getUserStats(): Promise<UserStats> {
  return apiClient.get(`${API_BASE}/stats`);
}

// 角色显示名称映射
export const ROLE_NAMES: Record<string, string> = {
  STUDENT: '学生',
  TEACHER: '教师',
  ADMIN: '管理员',
  SUPER_ADMIN: '超级管理员',
};

