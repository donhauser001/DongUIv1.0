import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    // 仅保留图标支持，移除 Tailwind/Uno 工具类
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/'
    }),
  ],
  // 移除 theme 和 shortcuts，完全交由 CSS 变量和 style.css 控制
})
