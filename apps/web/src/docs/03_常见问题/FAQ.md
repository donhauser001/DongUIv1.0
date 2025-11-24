# 常见问题 (FAQ)

## Q: 为什么端口是 51730？
A: 为了避免端口冲突，我们选择了高位端口段。你可以在 `vite.config.ts` 中修改它。

## Q: 如何新增一个图标？
A: 本项目使用 `UnoCSS` 的 `presetIcons`。你可以去 [Icones](https://icones.js.org/) 查找图标，然后直接使用类名，例如 `i-carbon-home`。

## Q: 后端连不上数据库怎么办？
A: 请检查 Docker 容器是否启动 (`docker ps`)，以及 `.env` 文件中的端口是否为 `54320`。

