import axios from 'axios'
import { themeConfig } from '@/config/theme'

const api = axios.create({
  baseURL: '/api', // Vite 代理会处理这个前缀
})

export async function getRemoteThemeConfig() {
  try {
    const res = await api.get('/config/theme_config')
    return res.data || themeConfig
  } catch (e) {
    console.warn('Failed to load remote theme config, using local fallback', e)
    return themeConfig
  }
}

export async function saveRemoteThemeConfig(config: typeof themeConfig) {
  return api.post('/config', {
    key: 'theme_config',
    value: config,
    description: 'Global UI Theme Configuration',
  })
}

