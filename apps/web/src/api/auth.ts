import { apiClient } from './client'

export interface LoginDto {
    email: string
    password: string
}

export interface RegisterDto {
    email: string
    name: string
    password: string
}

export interface AuthResponse {
    user: any
    token: string
}

export const authApi = {
    // 登录
    login(data: LoginDto): Promise<AuthResponse> {
        return apiClient.post('/auth/login', data)
    },

    // 注册
    register(data: RegisterDto): Promise<AuthResponse> {
        return apiClient.post('/auth/register', data)
    },

    // 获取当前用户信息
    getProfile(): Promise<any> {
        return apiClient.get('/auth/profile')
    },

    // 获取当前用户
    getCurrentUser(): Promise<any> {
        return apiClient.get('/auth/me')
    },

    // 退出登录（前端处理）
    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
    },
}

