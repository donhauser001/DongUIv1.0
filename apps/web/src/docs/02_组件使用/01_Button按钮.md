# Button 按钮组件

基于 CSS 变量系统封装的语义化按钮组件。

## 基础用法

直接使用预定义的 CSS 类名即可：

```html
<button class="btn-primary">主要按钮</button>
<button class="btn-outline">描边按钮</button>
```

## 状态

支持 `disabled` 属性自动处理样式，包括鼠标指针和颜色变化。

```html
<button class="btn-primary" disabled>禁用状态</button>
```

## 尺寸与样式

按钮的尺寸、圆角和颜色等样式均由全局 CSS 变量控制，可通过**组件画廊**进行全局配置，或在 CSS 中覆盖相应变量。

默认变量示例：
```css
--btn-primary-height: 2.5rem;
--btn-primary-padding-x: 1rem;
--btn-primary-radius: 0.375rem;
```

如需为特定按钮自定义样式，建议使用 CSS 类覆盖变量或属性：

```html
<button class="btn-primary btn-small">小按钮</button>

<style>
.btn-small {
  --btn-primary-height: 2rem;
  --btn-primary-padding-x: 0.5rem;
  font-size: 0.75rem;
}
</style>
```
