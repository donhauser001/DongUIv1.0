/**
 * 颜色初始化工具
 * 根据主色初始化所有组件的颜色配置
 */

/**
 * 根据主色初始化所有颜色相关的配置
 * 这样可以确保所有组件的颜色都跟随当前选择的配色方案
 */
export function initializeColorsFromPrimary(config: any, primaryColor: string) {
    if (!primaryColor || !primaryColor.startsWith('#')) return

    // 计算悬停颜色（主色加深 10%）
    const r = parseInt(primaryColor.slice(1, 3), 16)
    const g = parseInt(primaryColor.slice(3, 5), 16)
    const b = parseInt(primaryColor.slice(5, 7), 16)
    const hoverColor = `#${Math.floor(r * 0.9).toString(16).padStart(2, '0')}${Math.floor(g * 0.9).toString(16).padStart(2, '0')}${Math.floor(b * 0.9).toString(16).padStart(2, '0')}`

    // 按钮颜色
    if (config.button?.primary) {
        config.button.primary.backgroundColor = primaryColor
        config.button.primary.borderColor = primaryColor
        config.button.primary.hoverBackgroundColor = hoverColor
        config.button.primary.hoverBorderColor = primaryColor
    }
    if (config.button?.outline) {
        config.button.outline.hoverBorderColor = primaryColor
        config.button.outline.hoverTextColor = primaryColor
    }

    // 输入框颜色
    if (config.input?.text) {
        config.input.text.focusBorderColor = primaryColor
        config.input.text.focusRingColor = primaryColor
    }
    if (config.input?.textarea) {
        config.input.textarea.focusBorderColor = primaryColor
        config.input.textarea.focusRingColor = primaryColor
    }
    if (config.input?.richtext) {
        config.input.richtext.focusBorderColor = primaryColor
        config.input.richtext.focusRingColor = primaryColor
    }

    // 表单元素颜色
    if (config.form?.select) {
        config.form.select.focusBorderColor = primaryColor
        config.form.select.focusRingColor = primaryColor
    }
    if (config.form?.checkbox) {
        config.form.checkbox.checkedBackgroundColor = primaryColor
        config.form.checkbox.checkedBorderColor = primaryColor
    }
    if (config.form?.radio) {
        config.form.radio.checkedBorderColor = primaryColor
        config.form.radio.checkedDotColor = primaryColor
    }
    if (config.form?.switch) {
        config.form.switch.onBackgroundColor = primaryColor
    }

    // 卡片颜色
    if (config.card?.white) {
        config.card.white.hoverBorderColor = primaryColor
    }
    if (config.card?.dark) {
        config.card.dark.hoverBorderColor = primaryColor
    }

    // 表格操作菜单颜色
    if (config.table?.actionMenu) {
        config.table.actionMenu.triggerHoverColor = primaryColor
    }
}

/**
 * 将颜色重置为 var() 引用模式
 * 用于切换配色方案时，让组件颜色跟随新的主色
 */
export function resetColorsToVarMode(config: any) {
    // 按钮颜色
    if (config.button?.primary) {
        config.button.primary.backgroundColor = 'var(--color-primary)'
        config.button.primary.borderColor = 'var(--color-primary)'
        config.button.primary.hoverBackgroundColor = 'color-mix(in srgb, var(--color-primary), black 10%)'
        config.button.primary.hoverBorderColor = 'var(--color-primary)'
    }
    if (config.button?.outline) {
        config.button.outline.hoverBorderColor = 'var(--color-primary)'
        config.button.outline.hoverTextColor = 'var(--color-primary)'
    }

    // 输入框颜色
    if (config.input?.text) {
        config.input.text.focusBorderColor = 'var(--color-primary)'
        config.input.text.focusRingColor = 'var(--color-primary)'
    }
    if (config.input?.textarea) {
        config.input.textarea.focusBorderColor = 'var(--color-primary)'
        config.input.textarea.focusRingColor = 'var(--color-primary)'
    }
    if (config.input?.richtext) {
        config.input.richtext.focusBorderColor = 'var(--color-primary)'
        config.input.richtext.focusRingColor = 'var(--color-primary)'
    }

    // 表单元素颜色
    if (config.form?.select) {
        config.form.select.focusBorderColor = 'var(--color-primary)'
        config.form.select.focusRingColor = 'var(--color-primary)'
    }
    if (config.form?.checkbox) {
        config.form.checkbox.checkedBackgroundColor = 'var(--color-primary)'
        config.form.checkbox.checkedBorderColor = 'var(--color-primary)'
    }
    if (config.form?.radio) {
        config.form.radio.checkedBorderColor = 'var(--color-primary)'
        config.form.radio.checkedDotColor = 'var(--color-primary)'
    }
    if (config.form?.switch) {
        config.form.switch.onBackgroundColor = 'var(--color-primary)'
    }

    // 卡片颜色
    if (config.card?.white) {
        config.card.white.hoverBorderColor = 'var(--color-primary)'
    }
    if (config.card?.dark) {
        config.card.dark.hoverBorderColor = 'var(--color-primary)'
    }

    // 表格操作菜单颜色
    if (config.table?.actionMenu) {
        config.table.actionMenu.triggerHoverColor = 'var(--color-primary)'
    }
}

