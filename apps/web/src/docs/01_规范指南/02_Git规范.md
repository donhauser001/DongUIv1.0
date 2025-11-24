# Git 提交规范

本项目遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

## 格式

`type(scope): subject`

## 常用 Type

- **feat**: 新增功能
- **fix**: 修复 Bug
- **docs**: 文档变更
- **style**: 代码格式调整 (不影响逻辑)
- **refactor**: 代码重构
- **perf**: 性能优化
- **chore**: 构建过程或辅助工具的变动

## 示例

```bash
git commit -m "feat(user): add user detail page"
git commit -m "fix(auth): fix login button loading state"
```

