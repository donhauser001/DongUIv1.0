import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 51730, // 修改为冷门端口
    strictPort: true, // 端口被占用则直接退出，不尝试下一个
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:50000', // 明确使用 IPv4 地址
        changeOrigin: true,
        // 不需要 rewrite，因为后端已经有 /api 前缀
      },
    }
  },
  build: {
    // 构建优化配置
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境移除console
        drop_debugger: true,
      },
    },
    // 代码分割策略
    rollupOptions: {
      output: {
        // 手动分块策略
        manualChunks: {
          // Vue核心库
          'vue-vendor': ['vue', 'vue-router'],
          // UI组件
          'ui-components': [
            './src/components/Modal.vue',
            './src/components/ActionMenu.vue',
            './src/components/RichTextEditor.vue',
          ],
        },
        // 分块文件命名
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      },
    },
    // 分块大小警告阈值
    chunkSizeWarningLimit: 1000,
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['vue', 'vue-router'],
  },
})
