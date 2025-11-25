# Git 规范

本项目采用规范化的 Git 工作流程，确保代码质量和团队协作效率。

## 📌 分支管理

### 主要分支

- **main**: 主分支，始终保持可发布状态
- **develop**: 开发分支，日常开发的主要分支

### 功能分支

从 `develop` 分支创建，完成后合并回 `develop`：

```bash
# 创建功能分支
git checkout -b feature/your-feature-name develop

# 完成后合并
git checkout develop
git merge --no-ff feature/your-feature-name
git branch -d feature/your-feature-name
```

### 修复分支

从 `main` 分支创建，用于紧急修复：

```bash
# 创建修复分支
git checkout -b hotfix/your-fix-name main

# 完成后合并到 main 和 develop
git checkout main
git merge --no-ff hotfix/your-fix-name
git checkout develop
git merge --no-ff hotfix/your-fix-name
git branch -d hotfix/your-fix-name
```

## 📝 提交规范

### Commit Message 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

- **feat**: 新功能
- **fix**: 修复 Bug
- **docs**: 文档更新
- **style**: 代码格式调整（不影响功能）
- **refactor**: 代码重构
- **perf**: 性能优化
- **test**: 测试相关
- **chore**: 构建/工具链相关
- **revert**: 回滚提交

### Scope 范围（可选）

- **web**: 前端相关
- **server**: 后端相关
- **theme**: 主题系统
- **component**: 组件相关
- **docs**: 文档相关
- **config**: 配置相关

### Subject 主题

- 简明扼要描述本次提交
- 使用祈使句，现在时态
- 首字母小写
- 结尾不加句号
- 中英文均可

### 示例

```bash
# 新功能
git commit -m "feat(component): 添加富文本编辑器组件"
git commit -m "feat(theme): 实现主题配置导入导出功能"

# 修复 Bug
git commit -m "fix(web): 修复侧边栏折叠状态异常"
git commit -m "fix(server): 修复配置保存接口参数验证"

# 文档更新
git commit -m "docs: 更新项目结构文档"
git commit -m "docs(component): 补充富文本编辑器使用说明"

# 代码重构
git commit -m "refactor(theme): 优化主题应用逻辑"
git commit -m "refactor: 统一组件设置页面样式"

# 性能优化
git commit -m "perf(web): 优化路由懒加载配置"

# 构建相关
git commit -m "chore: 更新依赖版本"
git commit -m "chore(config): 调整 Vite 构建配置"
```

### 详细提交示例

```bash
git commit -m "feat(component): 添加富文本编辑器组件

- 实现文本格式化功能（加粗、斜体、下划线等）
- 支持标题、列表、引用等块级元素
- 集成图片上传和尺寸调整
- 添加颜色选择器（文字和背景色）
- 支持行距和字号调整

Closes #123"
```

## 🔄 工作流程

### 1. 开始新功能

```bash
# 1. 更新本地 develop 分支
git checkout develop
git pull origin develop

# 2. 创建功能分支
git checkout -b feature/new-feature

# 3. 开发并提交
git add .
git commit -m "feat: 添加新功能"

# 4. 推送到远程
git push origin feature/new-feature

# 5. 创建 Pull Request
# 在 GitHub/GitLab 上创建 PR，等待代码审查
```

### 2. 同步主分支更新

```bash
# 在功能分支上同步 develop 的更新
git checkout feature/your-feature
git fetch origin
git rebase origin/develop

# 如果有冲突，解决后继续
git add .
git rebase --continue
```

### 3. 合并功能分支

```bash
# 1. 确保功能分支是最新的
git checkout feature/your-feature
git rebase origin/develop

# 2. 切换到 develop 分支
git checkout develop
git pull origin develop

# 3. 合并功能分支（使用 --no-ff 保留分支历史）
git merge --no-ff feature/your-feature

# 4. 推送到远程
git push origin develop

# 5. 删除功能分支
git branch -d feature/your-feature
git push origin --delete feature/your-feature
```

## 🚫 禁止操作

### 1. 禁止直接在 main 分支开发

```bash
# ❌ 错误
git checkout main
git commit -m "feat: 添加新功能"

# ✅ 正确
git checkout -b feature/new-feature develop
git commit -m "feat: 添加新功能"
```

### 2. 禁止强制推送到主分支

```bash
# ❌ 绝对禁止
git push --force origin main
git push --force origin develop

# ✅ 功能分支可以强制推送（谨慎使用）
git push --force origin feature/your-feature
```

### 3. 禁止提交大文件

```bash
# 检查文件大小
git ls-files -s | awk '$4 > 1000000 {print $4, $5}'

# 如果误提交大文件，使用 git-filter-branch 清理
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch path/to/large/file' \
  --prune-empty --tag-name-filter cat -- --all
```

### 4. 禁止提交敏感信息

```bash
# ❌ 禁止提交
- 密码、密钥
- API Token
- 数据库连接字符串
- .env 文件（应在 .gitignore 中）

# ✅ 使用环境变量
# .env.example (提交到仓库)
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
API_KEY=your_api_key_here

# .env (不提交，在 .gitignore 中)
DATABASE_URL=postgresql://real_user:real_password@localhost:5432/real_db
API_KEY=real_api_key_12345
```

## 🏷️ 标签管理

### 创建版本标签

```bash
# 创建带注释的标签
git tag -a v1.0.0 -m "Release version 1.0.0"

# 推送标签到远程
git push origin v1.0.0

# 推送所有标签
git push origin --tags
```

### 标签命名规范

遵循语义化版本 (Semantic Versioning):

- **v1.0.0**: 主版本.次版本.修订版本
- **v1.0.0-alpha**: 内测版本
- **v1.0.0-beta**: 公测版本
- **v1.0.0-rc.1**: 发布候选版本

## 🔍 代码审查

### Pull Request 规范

1. **标题**: 简明扼要，遵循 Commit Message 规范
2. **描述**: 详细说明本次 PR 的目的和改动
3. **关联 Issue**: 使用 `Closes #123` 关联相关问题
4. **截图**: 如果涉及 UI 改动，提供前后对比截图
5. **测试**: 说明测试情况

### PR 模板示例

```markdown
## 改动说明

简要描述本次 PR 的目的和主要改动。

## 改动类型

- [ ] 新功能
- [ ] Bug 修复
- [ ] 文档更新
- [ ] 代码重构
- [ ] 性能优化
- [ ] 其他

## 测试情况

- [ ] 本地测试通过
- [ ] 添加了单元测试
- [ ] 添加了集成测试

## 相关 Issue

Closes #123

## 截图（如果适用）

### 改动前
![before](url)

### 改动后
![after](url)

## 其他说明

补充说明...
```

## 📚 相关资源

- [语义化版本规范](https://semver.org/lang/zh-CN/)
- [约定式提交规范](https://www.conventionalcommits.org/zh-hans/)
- [Git 工作流程](https://nvie.com/posts/a-successful-git-branching-model/)

## 🔗 相关文档

- [项目结构](./01_项目结构.md)
- [UI 设计规范](./03_UI设计规范.md)
