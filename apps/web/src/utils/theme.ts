import { themeConfig } from '@/config/theme'
import { getRemoteThemeConfig } from '@/api/config'

/**
 * 应用主题配置到 CSS 变量
 * 这样可以在运行时动态修改整个系统的样式
 */
export function applyTheme(theme: typeof themeConfig) {
  const root = document.documentElement

  // 帮助函数：处理颜色回退，支持 var() 引用
  const resolveColor = (color: string | undefined, fallbackVar: string) => {
    if (!color) return `var(${fallbackVar})`
    // 如果用户手动输入了 var(--color-primary)，直接使用
    if (color.startsWith('var')) return color
    // 如果用户输入了具体颜色值，使用该颜色值
    return color
  }

  // 应用卡片样式变量
  if (theme.card) {
    // 通用设置
    root.style.setProperty('--card-padding', theme.card.padding)
    root.style.setProperty('--card-radius', theme.card.radius)
    root.style.setProperty('--card-border-width', theme.card.borderWidth)
    root.style.setProperty('--card-shadow', theme.card.shadow)
    root.style.setProperty('--card-hover-shadow', theme.card.hoverShadow)

    // 白底卡片
    if (theme.card.white) {
      root.style.setProperty('--card-white-bg-color', theme.card.white.backgroundColor)
      root.style.setProperty('--card-white-border-color', theme.card.white.borderColor)
      root.style.setProperty('--card-white-title-color', theme.card.white.titleColor)
      root.style.setProperty('--card-white-content-color', theme.card.white.contentColor)
      root.style.setProperty('--card-white-hover-border-color', resolveColor(theme.card.white.hoverBorderColor, '--color-primary'))
    }

    // 主色底卡片
    if (theme.card.primary) {
      root.style.setProperty('--card-primary-bg-color', resolveColor(theme.card.primary.backgroundColor, '--color-primary'))
      root.style.setProperty('--card-primary-border-color', resolveColor(theme.card.primary.borderColor, '--color-primary'))
      root.style.setProperty('--card-primary-title-color', theme.card.primary.titleColor)
      root.style.setProperty('--card-primary-content-color', theme.card.primary.contentColor)
      root.style.setProperty('--card-primary-hover-border-color', theme.card.primary.hoverBorderColor)
    }

    // 黑底卡片
    if (theme.card.dark) {
      root.style.setProperty('--card-dark-bg-color', theme.card.dark.backgroundColor)
      root.style.setProperty('--card-dark-border-color', theme.card.dark.borderColor)
      root.style.setProperty('--card-dark-title-color', theme.card.dark.titleColor)
      root.style.setProperty('--card-dark-content-color', theme.card.dark.contentColor)
      root.style.setProperty('--card-dark-hover-border-color', resolveColor(theme.card.dark.hoverBorderColor, '--color-primary'))
    }

    // 保持向后兼容（默认使用白底卡片）
    if (theme.card.white) {
      root.style.setProperty('--card-bg-color', theme.card.white.backgroundColor)
      root.style.setProperty('--card-border-color', theme.card.white.borderColor)
      root.style.setProperty('--card-title-color', theme.card.white.titleColor)
      root.style.setProperty('--card-content-color', theme.card.white.contentColor)
      root.style.setProperty('--card-hover-border-color', resolveColor(theme.card.white.hoverBorderColor, '--color-primary'))
    }
  }

  // 应用颜色变量
  if (theme.colors) {
    // 基础颜色（必须应用）
    if (theme.colors.primary) root.style.setProperty('--color-primary', theme.colors.primary)
    if (theme.colors.secondary) root.style.setProperty('--color-secondary', theme.colors.secondary)
    if (theme.colors.accent) root.style.setProperty('--color-accent', theme.colors.accent)
    if (theme.colors.border) root.style.setProperty('--color-border', theme.colors.border)
    if (theme.colors.dark) root.style.setProperty('--color-dark', theme.colors.dark)

    // 功能色
    if (theme.colors.success) root.style.setProperty('--color-success', theme.colors.success)
    if (theme.colors.warning) root.style.setProperty('--color-warning', theme.colors.warning)
    if (theme.colors.error) root.style.setProperty('--color-error', theme.colors.error)
    if (theme.colors.info) root.style.setProperty('--color-info', theme.colors.info)

    // 文本色
    if (theme.colors.textPrimary) root.style.setProperty('--color-text-primary', theme.colors.textPrimary)
    if (theme.colors.textSecondary) root.style.setProperty('--color-text-secondary', theme.colors.textSecondary)
    if (theme.colors.textTertiary) root.style.setProperty('--color-text-tertiary', theme.colors.textTertiary)

    // 背景色
    if (theme.colors.bgPrimary) root.style.setProperty('--color-bg-primary', theme.colors.bgPrimary)
    if (theme.colors.bgSecondary) root.style.setProperty('--color-bg-secondary', theme.colors.bgSecondary)
    if (theme.colors.bgTertiary) root.style.setProperty('--color-bg-tertiary', theme.colors.bgTertiary)
  }

  // 应用全局样式变量
  if (theme.style) {
    root.style.setProperty('--radius', theme.style.radius)
    root.style.setProperty('--border-width', theme.style.borderWidth)
    root.style.setProperty('--divider-style', theme.style.dividerStyle || 'solid')
  }

  // 应用字体系统变量
  if (theme.typography) {
    root.style.setProperty('--font-family', theme.typography.fontFamily)

    // 旧变量兼容 (保留)
    if (theme.typography.fontSizeBase) root.style.setProperty('--font-size-base', theme.typography.fontSizeBase)
    if (theme.typography.fontSizeSm) root.style.setProperty('--font-size-sm', theme.typography.fontSizeSm)
    if (theme.typography.fontSizeLg) root.style.setProperty('--font-size-lg', theme.typography.fontSizeLg)
    if (theme.typography.fontSizeXl) root.style.setProperty('--font-size-xl', theme.typography.fontSizeXl)
    if (theme.typography.fontSize2xl) root.style.setProperty('--font-size-2xl', theme.typography.fontSize2xl)
    if (theme.typography.lineHeightBase) root.style.setProperty('--line-height-base', theme.typography.lineHeightBase)
    if (theme.typography.lineHeightTight) root.style.setProperty('--line-height-tight', theme.typography.lineHeightTight)
    if (theme.typography.fontWeightNormal) root.style.setProperty('--font-weight-normal', theme.typography.fontWeightNormal)
    if (theme.typography.fontWeightMedium) root.style.setProperty('--font-weight-medium', theme.typography.fontWeightMedium)
    if (theme.typography.fontWeightSemibold) root.style.setProperty('--font-weight-semibold', theme.typography.fontWeightSemibold)
    if (theme.typography.fontWeightBold) root.style.setProperty('--font-weight-bold', theme.typography.fontWeightBold)

    // 语义化排版变量 (包含外边距)
    if (theme.typography.h1) {
      root.style.setProperty('--font-h1-size', theme.typography.h1.size)
      root.style.setProperty('--font-h1-weight', theme.typography.h1.weight)
      root.style.setProperty('--font-h1-height', theme.typography.h1.lineHeight)
      root.style.setProperty('--font-h1-margin-top', theme.typography.h1.marginTop || '0')
      root.style.setProperty('--font-h1-margin-bottom', theme.typography.h1.marginBottom || '1rem')
      root.style.setProperty('--font-h1-margin-left', theme.typography.h1.marginLeft || '0')
      root.style.setProperty('--font-h1-margin-right', theme.typography.h1.marginRight || '0')
    }
    if (theme.typography.h2) {
      root.style.setProperty('--font-h2-size', theme.typography.h2.size)
      root.style.setProperty('--font-h2-weight', theme.typography.h2.weight)
      root.style.setProperty('--font-h2-height', theme.typography.h2.lineHeight)
      root.style.setProperty('--font-h2-margin-top', theme.typography.h2.marginTop || '0')
      root.style.setProperty('--font-h2-margin-bottom', theme.typography.h2.marginBottom || '1rem')
      root.style.setProperty('--font-h2-margin-left', theme.typography.h2.marginLeft || '0')
      root.style.setProperty('--font-h2-margin-right', theme.typography.h2.marginRight || '0')
    }
    if (theme.typography.h3) {
      root.style.setProperty('--font-h3-size', theme.typography.h3.size)
      root.style.setProperty('--font-h3-weight', theme.typography.h3.weight)
      root.style.setProperty('--font-h3-height', theme.typography.h3.lineHeight)
      root.style.setProperty('--font-h3-margin-top', theme.typography.h3.marginTop || '0')
      root.style.setProperty('--font-h3-margin-bottom', theme.typography.h3.marginBottom || '1rem')
      root.style.setProperty('--font-h3-margin-left', theme.typography.h3.marginLeft || '0')
      root.style.setProperty('--font-h3-margin-right', theme.typography.h3.marginRight || '0')
    }
    if (theme.typography.h4) {
      root.style.setProperty('--font-h4-size', theme.typography.h4.size)
      root.style.setProperty('--font-h4-weight', theme.typography.h4.weight)
      root.style.setProperty('--font-h4-height', theme.typography.h4.lineHeight)
      root.style.setProperty('--font-h4-margin-top', theme.typography.h4.marginTop || '0')
      root.style.setProperty('--font-h4-margin-bottom', theme.typography.h4.marginBottom || '1rem')
      root.style.setProperty('--font-h4-margin-left', theme.typography.h4.marginLeft || '0')
      root.style.setProperty('--font-h4-margin-right', theme.typography.h4.marginRight || '0')
    }
    if (theme.typography.body) {
      root.style.setProperty('--font-body-size', theme.typography.body.size)
      root.style.setProperty('--font-body-weight', theme.typography.body.weight)
      root.style.setProperty('--font-body-height', theme.typography.body.lineHeight)
      root.style.setProperty('--font-body-margin-top', theme.typography.body.marginTop || '0')
      root.style.setProperty('--font-body-margin-bottom', theme.typography.body.marginBottom || '1rem')
      root.style.setProperty('--font-body-margin-left', theme.typography.body.marginLeft || '0')
      root.style.setProperty('--font-body-margin-right', theme.typography.body.marginRight || '0')
    }
    if (theme.typography.description) {
      root.style.setProperty('--font-desc-size', theme.typography.description.size)
      root.style.setProperty('--font-desc-weight', theme.typography.description.weight)
      root.style.setProperty('--font-desc-height', theme.typography.description.lineHeight)
      root.style.setProperty('--font-desc-margin-top', theme.typography.description.marginTop || '0')
      root.style.setProperty('--font-desc-margin-bottom', theme.typography.description.marginBottom || '1rem')
      root.style.setProperty('--font-desc-margin-left', theme.typography.description.marginLeft || '0')
      root.style.setProperty('--font-desc-margin-right', theme.typography.description.marginRight || '0')
    }
    if (theme.typography.quote) {
      root.style.setProperty('--font-quote-size', theme.typography.quote.size)
      root.style.setProperty('--font-quote-weight', theme.typography.quote.weight)
      root.style.setProperty('--font-quote-height', theme.typography.quote.lineHeight)
      root.style.setProperty('--font-quote-margin-top', theme.typography.quote.marginTop || '0')
      root.style.setProperty('--font-quote-margin-bottom', theme.typography.quote.marginBottom || '1rem')
      root.style.setProperty('--font-quote-margin-left', theme.typography.quote.marginLeft || '0')
      root.style.setProperty('--font-quote-margin-right', theme.typography.quote.marginRight || '0')
    }
    if (theme.typography.paragraphSpacing) {
      root.style.setProperty('--paragraph-spacing', theme.typography.paragraphSpacing)
    }
  }

  // 应用按钮样式变量 - 主要按钮
  if (theme.button?.primary) {
    const btn = theme.button.primary
    root.style.setProperty('--btn-primary-height', btn.height)
    root.style.setProperty('--btn-primary-padding-x', btn.paddingX)
    root.style.setProperty('--btn-primary-padding-y', btn.paddingY)
    root.style.setProperty('--btn-primary-radius', btn.radius)
    root.style.setProperty('--btn-primary-border-width', btn.borderWidth)

    // 智能回退逻辑：优先使用配置值，若为空则使用全局主色变量
    root.style.setProperty('--btn-primary-border-color', resolveColor(btn.borderColor, '--color-primary'))
    root.style.setProperty('--btn-primary-bg-color', resolveColor(btn.backgroundColor, '--color-primary'))
    root.style.setProperty('--btn-primary-text-color', btn.textColor)

    // 悬停状态回退处理
    const hoverBg = btn.hoverBackgroundColor || 'color-mix(in srgb, var(--color-primary), black 10%)'
    root.style.setProperty('--btn-primary-hover-bg-color', hoverBg)

    // 添加主要按钮悬停文字颜色回退
    // 通常为白色，但也允许用户在配置中覆盖
    const hoverText = (btn as any).hoverTextColor || '#ffffff'
    root.style.setProperty('--btn-primary-hover-text-color', hoverText)

    // 添加主要按钮悬停边框颜色 (默认使用正常状态边框色)
    const hoverBorder = (btn as any).hoverBorderColor || resolveColor(btn.borderColor, '--color-primary')
    root.style.setProperty('--btn-primary-hover-border-color', hoverBorder)

    root.style.setProperty('--btn-primary-disabled-bg-color', btn.disabledBackgroundColor)
    root.style.setProperty('--btn-primary-disabled-text-color', btn.disabledTextColor)

    // 添加主要按钮禁用边框颜色 (默认 transparent)
    const disabledBorder = (btn as any).disabledBorderColor || 'transparent'
    root.style.setProperty('--btn-primary-disabled-border-color', disabledBorder)
  }

  // 应用按钮样式变量 - 次要按钮
  if (theme.button?.outline) {
    const btn = theme.button.outline
    root.style.setProperty('--btn-outline-height', btn.height)
    root.style.setProperty('--btn-outline-padding-x', btn.paddingX)
    root.style.setProperty('--btn-outline-padding-y', btn.paddingY)
    root.style.setProperty('--btn-outline-radius', btn.radius)
    root.style.setProperty('--btn-outline-border-width', btn.borderWidth)
    root.style.setProperty('--btn-outline-border-color', btn.borderColor)
    root.style.setProperty('--btn-outline-bg-color', btn.backgroundColor)
    root.style.setProperty('--btn-outline-text-color', btn.textColor)
    root.style.setProperty('--btn-outline-hover-bg-color', btn.hoverBackgroundColor)

    // 智能回退逻辑
    root.style.setProperty('--btn-outline-hover-border-color', resolveColor(btn.hoverBorderColor, '--color-primary'))
    root.style.setProperty('--btn-outline-hover-text-color', resolveColor(btn.hoverTextColor, '--color-primary'))

    root.style.setProperty('--btn-outline-disabled-bg-color', btn.disabledBackgroundColor)
    root.style.setProperty('--btn-outline-disabled-text-color', btn.disabledTextColor)
    root.style.setProperty('--btn-outline-disabled-border-color', btn.disabledBorderColor)
  }

  // 应用输入框样式变量
  if (theme.input) {
    // 单行文本输入框
    if (theme.input.text) {
      const input = theme.input.text
      root.style.setProperty('--input-height', input.height)
      root.style.setProperty('--input-padding-x', input.paddingX)
      root.style.setProperty('--input-padding-y', input.paddingY)
      root.style.setProperty('--input-radius', input.radius)
      root.style.setProperty('--input-border-width', input.borderWidth)
      root.style.setProperty('--input-border-color', input.borderColor)
      root.style.setProperty('--input-bg-color', input.backgroundColor)
      root.style.setProperty('--input-text-color', input.textColor)
      root.style.setProperty('--input-placeholder-color', input.placeholderColor)

      // 智能回退逻辑
      root.style.setProperty('--input-focus-border-color', resolveColor(input.focusBorderColor, '--color-primary'))
      root.style.setProperty('--input-focus-ring-color', resolveColor(input.focusRingColor, '--color-primary'))

      root.style.setProperty('--input-disabled-bg-color', input.disabledBackgroundColor)
      root.style.setProperty('--input-disabled-text-color', input.disabledTextColor)
      root.style.setProperty('--input-disabled-border-color', input.disabledBorderColor)
    }

    // 多行文本框
    if (theme.input.textarea) {
      const textarea = theme.input.textarea
      root.style.setProperty('--textarea-min-height', textarea.minHeight)
      root.style.setProperty('--textarea-padding-x', textarea.paddingX)
      root.style.setProperty('--textarea-padding-y', textarea.paddingY)
      root.style.setProperty('--textarea-radius', textarea.radius)
      root.style.setProperty('--textarea-border-width', textarea.borderWidth)
      root.style.setProperty('--textarea-border-color', textarea.borderColor)
      root.style.setProperty('--textarea-bg-color', textarea.backgroundColor)
      root.style.setProperty('--textarea-text-color', textarea.textColor)
      root.style.setProperty('--textarea-placeholder-color', textarea.placeholderColor)
      root.style.setProperty('--textarea-resize', textarea.resize)

      root.style.setProperty('--textarea-focus-border-color', resolveColor(textarea.focusBorderColor, '--color-primary'))
      root.style.setProperty('--textarea-focus-ring-color', resolveColor(textarea.focusRingColor, '--color-primary'))

      root.style.setProperty('--textarea-disabled-bg-color', textarea.disabledBackgroundColor)
      root.style.setProperty('--textarea-disabled-text-color', textarea.disabledTextColor)
      root.style.setProperty('--textarea-disabled-border-color', textarea.disabledBorderColor)
    }

    // 富文本编辑器
    if (theme.input.richtext) {
      const richtext = theme.input.richtext
      root.style.setProperty('--richtext-min-height', richtext.minHeight)
      root.style.setProperty('--richtext-border-width', richtext.borderWidth)
      root.style.setProperty('--richtext-border-color', richtext.borderColor)
      root.style.setProperty('--richtext-bg-color', richtext.backgroundColor)
      root.style.setProperty('--richtext-radius', richtext.radius)

      root.style.setProperty('--richtext-toolbar-bg-color', richtext.toolbarBackgroundColor)
      root.style.setProperty('--richtext-toolbar-border-color', richtext.toolbarBorderColor)
      root.style.setProperty('--richtext-toolbar-button-hover-color', richtext.toolbarButtonHoverColor)

      root.style.setProperty('--richtext-editor-padding-x', richtext.editorPaddingX)
      root.style.setProperty('--richtext-editor-padding-y', richtext.editorPaddingY)
      root.style.setProperty('--richtext-editor-text-color', richtext.editorTextColor)

      root.style.setProperty('--richtext-focus-border-color', resolveColor(richtext.focusBorderColor, '--color-primary'))
      root.style.setProperty('--richtext-focus-ring-color', resolveColor(richtext.focusRingColor, '--color-primary'))
    }
  }

  // 应用表单元素变量
  if (theme.form) {
    // 下拉框
    if (theme.form.select) {
      const select = theme.form.select
      root.style.setProperty('--select-height', select.height)
      root.style.setProperty('--select-padding-x', select.paddingX || '0.75rem')
      root.style.setProperty('--select-radius', select.radius)
      root.style.setProperty('--select-border-width', select.borderWidth)
      root.style.setProperty('--select-border-color', select.borderColor)
      root.style.setProperty('--select-bg-color', select.backgroundColor)
      root.style.setProperty('--select-text-color', select.textColor)
      root.style.setProperty('--select-focus-border-color', resolveColor(select.focusBorderColor, '--color-primary'))
      root.style.setProperty('--select-focus-ring-color', resolveColor(select.focusRingColor, '--color-primary'))
    }

    // 复选框
    if (theme.form.checkbox) {
      const checkbox = theme.form.checkbox
      root.style.setProperty('--checkbox-size', checkbox.size)
      root.style.setProperty('--checkbox-radius', checkbox.radius)
      root.style.setProperty('--checkbox-border-width', checkbox.borderWidth)
      root.style.setProperty('--checkbox-border-color', checkbox.borderColor)
      root.style.setProperty('--checkbox-bg-color', checkbox.backgroundColor || '#ffffff')
      root.style.setProperty('--checkbox-checked-bg-color', resolveColor(checkbox.checkedBackgroundColor, '--color-primary'))
      root.style.setProperty('--checkbox-checked-border-color', resolveColor(checkbox.checkedBorderColor, '--color-primary'))
      root.style.setProperty('--checkbox-checkmark-color', checkbox.checkmarkColor)
    }

    // 单选框
    if (theme.form.radio) {
      const radio = theme.form.radio
      root.style.setProperty('--radio-size', radio.size)
      root.style.setProperty('--radio-border-width', radio.borderWidth)
      root.style.setProperty('--radio-border-color', radio.borderColor)
      root.style.setProperty('--radio-bg-color', radio.backgroundColor || '#ffffff')
      root.style.setProperty('--radio-checked-border-color', resolveColor(radio.checkedBorderColor, '--color-primary'))
      root.style.setProperty('--radio-checked-dot-color', resolveColor(radio.checkedDotColor, '--color-primary'))
      root.style.setProperty('--radio-dot-size', radio.dotSize)
    }

    // 开关
    if (theme.form.switch) {
      const switchConfig = theme.form.switch
      root.style.setProperty('--switch-width', switchConfig.width)
      root.style.setProperty('--switch-height', switchConfig.height)
      root.style.setProperty('--switch-off-bg-color', switchConfig.offBackgroundColor)
      root.style.setProperty('--switch-on-bg-color', resolveColor(switchConfig.onBackgroundColor, '--color-primary'))
      root.style.setProperty('--switch-thumb-color', switchConfig.thumbColor)
    }
  }

  // 应用标签变量
  if (theme.tag) {
    // 默认标签
    if (theme.tag.default) {
      const tag = theme.tag.default
      const fontSize = tag.size === 'small' ? '0.75rem' : tag.size === 'large' ? '1rem' : '0.875rem'
      const padding = tag.size === 'small' ? '0.125rem 0.5rem' : tag.size === 'large' ? '0.375rem 0.875rem' : '0.25rem 0.75rem'
      root.style.setProperty('--tag-default-font-size', fontSize)
      root.style.setProperty('--tag-default-padding', padding)
      root.style.setProperty('--tag-default-radius', tag.radius)
      root.style.setProperty('--tag-default-bg-color', tag.backgroundColor)
      root.style.setProperty('--tag-default-text-color', tag.textColor)
      root.style.setProperty('--tag-default-border-color', tag.borderColor)
    }

    // 成功标签
    if (theme.tag.success) {
      const tag = theme.tag.success
      const fontSize = tag.size === 'small' ? '0.75rem' : tag.size === 'large' ? '1rem' : '0.875rem'
      const padding = tag.size === 'small' ? '0.125rem 0.5rem' : tag.size === 'large' ? '0.375rem 0.875rem' : '0.25rem 0.75rem'
      root.style.setProperty('--tag-success-font-size', fontSize)
      root.style.setProperty('--tag-success-padding', padding)
      root.style.setProperty('--tag-success-radius', tag.radius)
      root.style.setProperty('--tag-success-bg-color', tag.backgroundColor)
      root.style.setProperty('--tag-success-text-color', tag.textColor)
      root.style.setProperty('--tag-success-border-color', tag.borderColor)
    }

    // 警告标签
    if (theme.tag.warning) {
      const tag = theme.tag.warning
      const fontSize = tag.size === 'small' ? '0.75rem' : tag.size === 'large' ? '1rem' : '0.875rem'
      const padding = tag.size === 'small' ? '0.125rem 0.5rem' : tag.size === 'large' ? '0.375rem 0.875rem' : '0.25rem 0.75rem'
      root.style.setProperty('--tag-warning-font-size', fontSize)
      root.style.setProperty('--tag-warning-padding', padding)
      root.style.setProperty('--tag-warning-radius', tag.radius)
      root.style.setProperty('--tag-warning-bg-color', tag.backgroundColor)
      root.style.setProperty('--tag-warning-text-color', tag.textColor)
      root.style.setProperty('--tag-warning-border-color', tag.borderColor)
    }

    // 危险标签
    if (theme.tag.danger) {
      const tag = theme.tag.danger
      const fontSize = tag.size === 'small' ? '0.75rem' : tag.size === 'large' ? '1rem' : '0.875rem'
      const padding = tag.size === 'small' ? '0.125rem 0.5rem' : tag.size === 'large' ? '0.375rem 0.875rem' : '0.25rem 0.75rem'
      root.style.setProperty('--tag-danger-font-size', fontSize)
      root.style.setProperty('--tag-danger-padding', padding)
      root.style.setProperty('--tag-danger-radius', tag.radius)
      root.style.setProperty('--tag-danger-bg-color', tag.backgroundColor)
      root.style.setProperty('--tag-danger-text-color', tag.textColor)
      root.style.setProperty('--tag-danger-border-color', tag.borderColor)
    }
  }

  // 应用模态窗变量
  if (theme.modal) {
    const modal = theme.modal
    // 尺寸
    const width = modal.size === 'small' ? '400px' : modal.size === 'large' ? '800px' : modal.size === 'xlarge' ? '1000px' : '600px'
    root.style.setProperty('--modal-width', width)
    root.style.setProperty('--modal-radius', modal.radius)
    root.style.setProperty('--modal-padding', modal.padding)

    // 背景和阴影
    root.style.setProperty('--modal-bg-color', modal.backgroundColor)
    root.style.setProperty('--modal-shadow', modal.shadow)

    // 遮罩层
    root.style.setProperty('--modal-overlay-color', modal.overlayColor)
    root.style.setProperty('--modal-overlay-opacity', modal.overlayOpacity.toString())
    root.style.setProperty('--modal-overlay-blur', modal.overlayBlur || '0px')

    // 头部
    root.style.setProperty('--modal-header-bg-color', modal.headerBackgroundColor)
    root.style.setProperty('--modal-header-border-bottom', modal.headerBorderBottom)
    root.style.setProperty('--modal-header-padding', modal.headerPadding)

    // 标题
    root.style.setProperty('--modal-title-color', modal.titleColor)
    root.style.setProperty('--modal-title-font-size', modal.titleFontSize)
    root.style.setProperty('--modal-title-font-weight', modal.titleFontWeight)

    // 内容区域
    root.style.setProperty('--modal-content-bg-color', modal.contentBackgroundColor)
    root.style.setProperty('--modal-content-color', modal.contentColor)
    root.style.setProperty('--modal-content-padding', modal.contentPadding)

    // 底部
    root.style.setProperty('--modal-footer-bg-color', modal.footerBackgroundColor)
    root.style.setProperty('--modal-footer-border-top', modal.footerBorderTop)
    root.style.setProperty('--modal-footer-padding', modal.footerPadding)
  }

  // 应用提示组件变量
  if (theme.notification) {
    const notification = theme.notification

    // Toast 提示
    if (notification.toast) {
      const toast = notification.toast
      root.style.setProperty('--toast-bg-color', toast.backgroundColor)
      root.style.setProperty('--toast-text-color', toast.textColor)
      root.style.setProperty('--toast-radius', toast.radius)
      root.style.setProperty('--toast-padding', toast.padding)
      root.style.setProperty('--toast-success-color', toast.successColor)
      root.style.setProperty('--toast-error-color', toast.errorColor)
    }

    // Alert 警告
    if (notification.alert) {
      const alert = notification.alert
      root.style.setProperty('--alert-radius', alert.radius)
      root.style.setProperty('--alert-padding', alert.padding)
      root.style.setProperty('--alert-border-width', alert.borderWidth)
      root.style.setProperty('--alert-info-bg-color', alert.infoBgColor)
      root.style.setProperty('--alert-info-border-color', alert.infoBorderColor)
      root.style.setProperty('--alert-success-bg-color', alert.successBgColor)
      root.style.setProperty('--alert-success-border-color', alert.successBorderColor)
      root.style.setProperty('--alert-warning-bg-color', alert.warningBgColor)
      root.style.setProperty('--alert-warning-border-color', alert.warningBorderColor)
      root.style.setProperty('--alert-error-bg-color', alert.errorBgColor)
      root.style.setProperty('--alert-error-border-color', alert.errorBorderColor)
    }

    // Message 消息
    if (notification.message) {
      const message = notification.message
      root.style.setProperty('--message-bg-color', message.backgroundColor)
      root.style.setProperty('--message-text-color', message.textColor)
      root.style.setProperty('--message-border-color', message.borderColor)
      root.style.setProperty('--message-radius', message.radius)
      root.style.setProperty('--message-padding', message.padding)
    }
  }

  // 应用布局变量
  if (theme.layout) {
    root.style.setProperty('--layout-sidebar-width', theme.layout.sidebarWidth)
    root.style.setProperty('--layout-sidebar-collapsed-width', theme.layout.sidebarCollapsedWidth)
    root.style.setProperty('--layout-header-height', theme.layout.headerHeight)
    root.style.setProperty('--layout-content-padding', theme.layout.contentPadding)
    root.style.setProperty('--layout-content-max-width', theme.layout.contentMaxWidth)

    // Admin Layout
    if (theme.layout.admin) {
      root.style.setProperty('--layout-admin-width', theme.layout.admin.width)
      root.style.setProperty('--layout-admin-padding', theme.layout.admin.padding)
    }

    // Web Layout
    if (theme.layout.web) {
      root.style.setProperty('--layout-web-width', theme.layout.web.width)
      root.style.setProperty('--layout-web-padding', theme.layout.web.padding)
    }
  }

  // 应用侧边栏样式变量
  if (theme.sidebar) {
    const sidebar = theme.sidebar
    root.style.setProperty('--sidebar-bg-color', sidebar.backgroundColor)
    root.style.setProperty('--sidebar-border-color', sidebar.borderColor)
    root.style.setProperty('--sidebar-menu-item-height', sidebar.menuItemHeight)
    root.style.setProperty('--sidebar-menu-item-padding-x', sidebar.menuItemPaddingX)
    root.style.setProperty('--sidebar-menu-item-padding-y', sidebar.menuItemPaddingY)
    root.style.setProperty('--sidebar-menu-item-radius', sidebar.menuItemRadius)
    root.style.setProperty('--sidebar-menu-item-text-color', sidebar.menuItemTextColor)
    root.style.setProperty('--sidebar-menu-item-hover-bg-color', sidebar.menuItemHoverBackgroundColor)
    root.style.setProperty('--sidebar-menu-item-hover-text-color', sidebar.menuItemHoverTextColor)
    // 强制关联主色
    root.style.setProperty('--sidebar-menu-item-active-bg-color', 'color-mix(in srgb, var(--color-primary), white 90%)')
    root.style.setProperty('--sidebar-menu-item-active-text-color', 'var(--color-primary)')
    root.style.setProperty('--sidebar-menu-item-active-border-color', 'color-mix(in srgb, var(--color-primary), white 80%)')
    root.style.setProperty('--sidebar-sub-menu-item-padding-left', sidebar.subMenuItemPaddingLeft)
  }

  // 应用头部样式变量
  if (theme.header) {
    // Global (Fallback)
    root.style.setProperty('--header-height', theme.header.height)
    root.style.setProperty('--header-bg-color', theme.header.backgroundColor)
    root.style.setProperty('--header-border-color', theme.header.borderColor)
    root.style.setProperty('--header-text-color', theme.header.textColor)
    root.style.setProperty('--header-padding-x', theme.header.paddingX)

    // Admin Header
    if (theme.header.admin) {
      root.style.setProperty('--admin-header-height', theme.header.admin.height)
      root.style.setProperty('--admin-header-bg-color', theme.header.admin.backgroundColor)
      root.style.setProperty('--admin-header-border-color', theme.header.admin.borderColor)
      root.style.setProperty('--admin-header-text-color', theme.header.admin.textColor)
      root.style.setProperty('--admin-header-padding-x', theme.header.admin.paddingX)
    }

    // Web Header
    if (theme.header.web) {
      root.style.setProperty('--web-header-height', theme.header.web.height)
      root.style.setProperty('--web-header-bg-color', theme.header.web.backgroundColor)
      root.style.setProperty('--web-header-border-color', theme.header.web.borderColor)
      root.style.setProperty('--web-header-text-color', theme.header.web.textColor)
      root.style.setProperty('--web-header-padding-x', theme.header.web.paddingX)
    }
  }

  // 应用表格设置
  if (theme.table) {
    // 外围边框
    if (theme.table.outerBorder !== undefined) {
      root.style.setProperty('--table-outer-border-width', theme.table.outerBorder ? (theme.table.outerBorderWidth || '1px') : '0')
    }
    if (theme.table.outerBorderColor) {
      root.style.setProperty('--table-outer-border-color', theme.table.outerBorderColor)
    }
    if (theme.table.borderRadius) {
      root.style.setProperty('--table-border-radius', theme.table.borderRadius)
    }

    // 内部边框
    if (theme.table.innerBorder !== undefined) {
      root.style.setProperty('--table-inner-border-width', theme.table.innerBorder ? (theme.table.innerBorderWidth || '1px') : '0')
    }
    if (theme.table.innerBorderColor) {
      root.style.setProperty('--table-inner-border-color', theme.table.innerBorderColor)
    }

    // 表头样式
    if (theme.table.headerBackgroundColor) {
      root.style.setProperty('--table-header-bg', theme.table.headerBackgroundColor)
    }
    if (theme.table.headerTextColor) {
      root.style.setProperty('--table-header-color', theme.table.headerTextColor)
    }
    if (theme.table.headerFontWeight) {
      root.style.setProperty('--table-header-weight', theme.table.headerFontWeight)
    }
    if ((theme.table as any).headerFontSize) {
      root.style.setProperty('--table-header-font-size', (theme.table as any).headerFontSize)
    }

    // 行样式
    if (theme.table.rowHeight) {
      root.style.setProperty('--table-row-height', theme.table.rowHeight)
    }
    if (theme.table.rowPaddingX) {
      root.style.setProperty('--table-padding-x', theme.table.rowPaddingX)
    }
    if (theme.table.rowPaddingY) {
      root.style.setProperty('--table-padding-y', theme.table.rowPaddingY)
    }
    if ((theme.table as any).rowTextColor) {
      root.style.setProperty('--table-row-color', (theme.table as any).rowTextColor)
    }
    if ((theme.table as any).rowFontSize) {
      root.style.setProperty('--table-row-font-size', (theme.table as any).rowFontSize)
    }
    if (theme.table.hoverRowBackgroundColor) {
      root.style.setProperty('--table-hover-bg', theme.table.hoverRowBackgroundColor)
    }

    // 斑马纹
    if (theme.table.zebraStripeColor) {
      root.style.setProperty('--table-stripe-color', theme.table.zebraStripeColor)
    }

    // 操作菜单
    if ((theme.table as any).actionMenu) {
      const menu = (theme.table as any).actionMenu
      if (menu.triggerSize) root.style.setProperty('--action-menu-trigger-size', menu.triggerSize)
      if (menu.triggerColor) root.style.setProperty('--action-menu-trigger-color', menu.triggerColor)
      if (menu.triggerHoverColor) root.style.setProperty('--action-menu-trigger-hover-color', menu.triggerHoverColor)
      if (menu.triggerHoverBg) root.style.setProperty('--action-menu-trigger-hover-bg', menu.triggerHoverBg)
      if (menu.triggerActiveColor) root.style.setProperty('--action-menu-trigger-active-color', menu.triggerActiveColor)
      if (menu.menuBg) root.style.setProperty('--action-menu-bg', menu.menuBg)
      if (menu.menuBorder) root.style.setProperty('--action-menu-border', menu.menuBorder)
      if (menu.menuShadow) root.style.setProperty('--action-menu-shadow', menu.menuShadow)
      if (menu.menuRadius) root.style.setProperty('--action-menu-radius', menu.menuRadius)
      if (menu.menuPadding) root.style.setProperty('--action-menu-padding', menu.menuPadding)
      if (menu.itemPadding) root.style.setProperty('--action-menu-item-padding', menu.itemPadding)
      if (menu.itemColor) root.style.setProperty('--action-menu-item-color', menu.itemColor)
      if (menu.itemFontSize) root.style.setProperty('--action-menu-item-font-size', menu.itemFontSize)
      if (menu.itemFontWeight) root.style.setProperty('--action-menu-item-font-weight', menu.itemFontWeight)
      if (menu.itemHoverBg) root.style.setProperty('--action-menu-item-hover-bg', menu.itemHoverBg)
      if (menu.itemDangerColor) root.style.setProperty('--action-menu-item-danger-color', menu.itemDangerColor)
      if (menu.itemDangerHoverBg) root.style.setProperty('--action-menu-item-danger-hover-bg', menu.itemDangerHoverBg)
    }
  }
}

/**
 * 深度合并对象
 */
function deepMerge(target: any, source: any) {
  for (const key in source) {
    if (
      source[key] instanceof Object &&
      key in target &&
      target[key] instanceof Object &&
      !Array.isArray(source[key])
    ) {
      deepMerge(target[key], source[key])
    } else {
      target[key] = source[key]
    }
  }
}

/**
 * 初始化主题（优先加载远程配置）
 */
export async function initTheme() {
  // 1. 先应用本地默认配置，避免白屏
  applyTheme(themeConfig)

  // 2. 异步加载远程配置并覆盖
  const remoteConfig = await getRemoteThemeConfig()
  if (remoteConfig) {
    // 深度合并远程配置到本地响应式对象
    deepMerge(themeConfig, remoteConfig)
    // 再次应用（确保 CSS 变量与合并后的配置一致）
    applyTheme(themeConfig)
  }
}
