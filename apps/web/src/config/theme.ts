import { reactive } from 'vue'

export const themeConfig = reactive({
  // 你的个人偏好主题色
  colors: {
    primary: '#03624C', // Bangladesh Green
    secondary: '#00cf3f', // Caribbean Green
    accent: '#26d849', // Mountain Meadow
    dark: '#1a1a1a', // 特殊卡片深色背景
    border: '#211f20', // 统一边框色
    // 功能色
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    // 文本色
    textPrimary: '#111827',
    textSecondary: '#6b7280',
    textTertiary: '#9ca3af',
    // 背景色
    bgPrimary: '#ffffff',
    bgSecondary: '#f9fafb',
    bgTertiary: '#f3f4f6',
  },
  // 全局样式偏好
  style: {
    radius: '0.375rem', // rounded-md
    borderWidth: '1px',
    dividerStyle: 'solid', // 'solid' | 'dashed' | 'dotted'
  },
  // 字体系统
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif',

    // 语义化排版配置
    h1: {
      size: '1.5rem', // 24px
      weight: '700', // bold
      lineHeight: '1.25',
      marginTop: '0',
      marginBottom: '1rem',
      marginLeft: '0',
      marginRight: '0'
    },
    h2: {
      size: '1.25rem', // 20px
      weight: '600', // semibold
      lineHeight: '1.25',
      marginTop: '0',
      marginBottom: '1rem',
      marginLeft: '0',
      marginRight: '0'
    },
    h3: {
      size: '1.125rem', // 18px
      weight: '600', // semibold
      lineHeight: '1.25',
      marginTop: '0',
      marginBottom: '1rem',
      marginLeft: '0',
      marginRight: '0'
    },
    h4: {
      size: '1rem', // 16px
      weight: '600', // semibold
      lineHeight: '1.5',
      marginTop: '0',
      marginBottom: '1rem',
      marginLeft: '0',
      marginRight: '0'
    },
    body: {
      size: '0.875rem', // 14px
      weight: '400', // normal
      lineHeight: '1.5',
      marginTop: '0',
      marginBottom: '1rem',
      marginLeft: '0',
      marginRight: '0'
    },
    description: {
      size: '0.75rem', // 12px
      weight: '400', // normal
      lineHeight: '1.5',
      marginTop: '0',
      marginBottom: '1rem',
      marginLeft: '0',
      marginRight: '0'
    },
    quote: {
      size: '0.875rem', // 14px
      weight: '400', // normal
      lineHeight: '1.5',
      marginTop: '0',
      marginBottom: '1rem',
      marginLeft: '0',
      marginRight: '0'
    },

    // 段落间距 (Legacy / Global Default)
    paragraphSpacing: '1rem', // 16px

    // 保留旧变量以防向后兼容（可选，建议逐步废弃或映射）
    fontSizeBase: '0.875rem',
    fontSizeSm: '0.75rem',
    fontSizeLg: '1rem',
    fontSizeXl: '1.125rem',
    fontSize2xl: '1.5rem',
    lineHeightBase: '1.5',
    lineHeightTight: '1.25',
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightSemibold: '600',
    fontWeightBold: '700',
  },
  // 按钮样式
  button: {
    primary: {
      height: 'auto', // 由内边距决定
      paddingX: '1rem', // 16px
      paddingY: '0.5rem', // 8px
      radius: '0.375rem',
      borderWidth: '1px',
      borderColor: 'var(--color-primary)',
      backgroundColor: 'var(--color-primary)',
      textColor: '#ffffff',
      hoverBackgroundColor: 'color-mix(in srgb, var(--color-primary), black 10%)',
      hoverBorderColor: 'var(--color-primary)', // 默认与正常状态一致
      hoverTextColor: '#ffffff',
      disabledBackgroundColor: '#d1d5db',
      disabledTextColor: '#9ca3af',
      disabledBorderColor: 'transparent',
    },
    outline: {
      height: 'auto', // 由内边距决定
      paddingX: '1rem',
      paddingY: '0.5rem',
      radius: '0.375rem',
      borderWidth: '1px',
      borderColor: '#211f20',
      backgroundColor: '#ffffff',
      textColor: '#111827',
      hoverBackgroundColor: '#f9fafb',
      hoverBorderColor: 'var(--color-primary)',
      hoverTextColor: 'var(--color-primary)',
      disabledBackgroundColor: '#ffffff',
      disabledTextColor: '#d1d5db',
      disabledBorderColor: '#e5e7eb',
    },
  },
  // 输入框样式
  input: {
    // 单行输入框
    text: {
      height: 'auto',
      paddingX: '0.75rem',
      paddingY: '0.5rem',
      radius: '0.375rem',
      borderWidth: '1px',
      borderColor: '#211f20',
      backgroundColor: '#ffffff',
      textColor: '#111827',
      placeholderColor: '#9ca3af',
      focusBorderColor: 'var(--color-primary)',
      focusRingColor: 'var(--color-primary)',
      disabledBackgroundColor: '#f3f4f6',
      disabledTextColor: '#9ca3af',
      disabledBorderColor: '#e5e7eb',
    },
    // 多行文本框
    textarea: {
      minHeight: '6rem', // 96px
      paddingX: '0.75rem',
      paddingY: '0.5rem',
      radius: '0.375rem',
      borderWidth: '1px',
      borderColor: '#211f20',
      backgroundColor: '#ffffff',
      textColor: '#111827',
      placeholderColor: '#9ca3af',
      focusBorderColor: 'var(--color-primary)',
      focusRingColor: 'var(--color-primary)',
      disabledBackgroundColor: '#f3f4f6',
      disabledTextColor: '#9ca3af',
      disabledBorderColor: '#e5e7eb',
      resize: 'vertical', // 'none' | 'vertical' | 'horizontal' | 'both'
    },
    // 富文本编辑器
    richtext: {
      minHeight: '12rem', // 192px
      borderWidth: '1px',
      borderColor: '#211f20',
      backgroundColor: '#ffffff',
      radius: '0.375rem',
      // 工具栏样式
      toolbarBackgroundColor: '#f9fafb',
      toolbarBorderColor: '#e5e7eb',
      toolbarButtonHoverColor: '#e5e7eb',
      // 编辑区域样式
      editorPaddingX: '1rem',
      editorPaddingY: '0.75rem',
      editorTextColor: '#111827',
      focusBorderColor: 'var(--color-primary)',
      focusRingColor: 'var(--color-primary)',
    },
  },
  // 表单元素
  form: {
    // 下拉框
    select: {
      height: '2.5rem',
      paddingX: '0.75rem',
      radius: '0.375rem',
      borderWidth: '1px',
      backgroundColor: '#ffffff',
      textColor: '#111827',
      borderColor: '#211f20',
      focusBorderColor: '',  // 将在组件中初始化为当前主题色
      focusRingColor: '',    // 将在组件中初始化为当前主题色
    },
    // 复选框
    checkbox: {
      size: '1.25rem',
      radius: '0.25rem',
      borderWidth: '1px',
      backgroundColor: '#ffffff',
      borderColor: '#d1d5db',
      checkedBackgroundColor: '',  // 将在组件中初始化为当前主题色
      checkedBorderColor: '',      // 将在组件中初始化为当前主题色
      checkmarkColor: '#ffffff',
    },
    // 单选框
    radio: {
      size: '1.25rem',
      borderWidth: '2px',
      backgroundColor: '#ffffff',
      borderColor: '#d1d5db',
      checkedBorderColor: '',  // 将在组件中初始化为当前主题色
      checkedDotColor: '',     // 将在组件中初始化为当前主题色
      dotSize: '0.5rem',
    },
    // 开关
    switch: {
      width: '2.75rem',
      height: '1.5rem',
      offBackgroundColor: '#d1d5db',
      onBackgroundColor: '',  // 将在组件中初始化为当前主题色
      thumbColor: '#ffffff',
    },
  },
  // 卡片
  card: {
    // 通用设置
    radius: '0.5rem',
    padding: '1rem',
    borderWidth: '1px',
    shadow: '0 1px 3px rgba(0,0,0,0.1)',
    hoverShadow: '0 4px 16px rgba(0,0,0,0.1)',

    // 白底卡片
    white: {
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      titleColor: '#111827',
      contentColor: '#6b7280',
      hoverBorderColor: 'var(--color-primary)',
    },

    // 主色底卡片
    primary: {
      backgroundColor: 'var(--color-primary)',
      borderColor: 'var(--color-primary)',
      titleColor: '#ffffff',
      contentColor: '#ffffff',
      hoverBorderColor: '#ffffff',
    },

    // 黑底卡片
    dark: {
      backgroundColor: '#1a1a1a',
      borderColor: '#2d2d2d',
      titleColor: '#ffffff',
      contentColor: '#d1d5db',
      hoverBorderColor: 'var(--color-primary)',
    },
  },
  // 标签
  tag: {
    default: {
      size: 'medium',
      radius: '0.25rem',
      backgroundColor: '#f3f4f6',
      textColor: '#374151',
      borderColor: '#e5e7eb',
    },
    success: {
      size: 'medium',
      radius: '0.25rem',
      backgroundColor: '#d1fae5',
      textColor: '#065f46',
      borderColor: '#a7f3d0',
    },
    warning: {
      size: 'medium',
      radius: '0.25rem',
      backgroundColor: '#fef3c7',
      textColor: '#92400e',
      borderColor: '#fde68a',
    },
    danger: {
      size: 'medium',
      radius: '0.25rem',
      backgroundColor: '#fee2e2',
      textColor: '#991b1b',
      borderColor: '#fecaca',
    },
  },
  // 模态窗
  modal: {
    size: 'medium',
    radius: '0.5rem',
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    shadow: '0 8px 32px rgba(0,0,0,0.2)',

    // 遮罩层
    overlayColor: '#000000',
    overlayOpacity: 0.5,
    overlayBlur: '0px',

    // 头部
    headerBackgroundColor: '#ffffff',
    headerBorderBottom: '1px solid #e5e7eb',
    headerPadding: '1.5rem',

    // 标题
    titleColor: '#111827',
    titleFontSize: '1.25rem',
    titleFontWeight: '600',

    // 内容区域
    contentBackgroundColor: '#ffffff',
    contentColor: '#374151',
    contentPadding: '1.5rem',

    // 底部
    footerBackgroundColor: '#ffffff',
    footerBorderTop: '1px solid #e5e7eb',
    footerPadding: '1.5rem',
  },
  // 提示组件
  notification: {
    // Toast 提示
    toast: {
      position: 'top-right',
      radius: '0.375rem',
      padding: '1rem',
      backgroundColor: '#1f2937',
      textColor: '#ffffff',
      successColor: '#10b981',
      errorColor: '#ef4444',
    },
    // Alert 警告
    alert: {
      radius: '0.375rem',
      padding: '1rem',
      borderWidth: '1px',
      infoBgColor: '#dbeafe',
      infoBorderColor: '#3b82f6',
      successBgColor: '#d1fae5',
      successBorderColor: '#10b981',
      warningBgColor: '#fef3c7',
      warningBorderColor: '#f59e0b',
      errorBgColor: '#fee2e2',
      errorBorderColor: '#ef4444',
    },
    // Message 消息
    message: {
      radius: '0.5rem',
      padding: '1rem',
      backgroundColor: '#ffffff',
      textColor: '#374151',
      borderColor: '#e5e7eb',
    },
  },
  // 表格样式
  table: {
    // 外围边框
    outerBorder: true,
    outerBorderWidth: '1px',
    outerBorderColor: '#e5e7eb',
    borderRadius: '0.5rem',
    // 内部单元格边框
    innerBorder: true,
    innerBorderWidth: '1px',
    innerBorderColor: '#e5e7eb',
    // 表头样式
    headerBackgroundColor: '#f9fafb',
    headerTextColor: '#111827',
    headerFontWeight: '600',
    headerFontSize: '0.875rem', // 14px
    // 行样式
    rowHeight: '3rem', // 48px
    rowPaddingX: '1rem',
    rowPaddingY: '0.75rem',
    rowTextColor: '#111827',
    rowFontSize: '0.875rem', // 14px
    hoverRowBackgroundColor: '#f3f4f6',
    // 斑马纹
    zebraStripe: false,
    zebraStripeColor: '#f9fafb',
    // 操作菜单
    actionMenu: {
      triggerSize: '2rem',
      triggerColor: '#6b7280',
      triggerHoverColor: '#111827',
      triggerHoverBg: '#f3f4f6',
      triggerActiveColor: '#03624C',
      menuBg: '#ffffff',
      menuBorder: '#e5e7eb',
      menuShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      menuRadius: '0.5rem',
      menuPadding: '0.25rem',
      itemPadding: '0.625rem 0.875rem',
      itemColor: '#111827',
      itemFontSize: '0.875rem',
      itemFontWeight: '400',
      itemHoverBg: '#f3f4f6',
      itemDangerColor: '#ef4444',
      itemDangerHoverBg: '#fef2f2',
    },
  },
  // 布局设置
  layout: {
    sidebarWidth: '16rem', // 256px
    sidebarCollapsedWidth: '4rem', // 64px
    headerHeight: '4rem', // 64px
    contentPadding: '2rem', // 32px
    contentMaxWidth: '1280px',

    // Admin Layout Specifics
    admin: {
      mode: 'full', // 'full' | 'boxed'
      width: '100%', // for boxed mode or max-width
      padding: '1.5rem',
    },
    // Web Layout Specifics
    web: {
      mode: 'boxed', // 'full' | 'boxed'
      width: '1200px',
      padding: '2rem',
    }
  },
  // 侧边栏样式
  sidebar: {
    backgroundColor: '#ffffff',
    borderColor: '#211f20',
    menuItemHeight: '2.75rem', // 44px
    menuItemPaddingX: '1rem',
    menuItemPaddingY: '0.75rem',
    menuItemRadius: '0.375rem',
    menuItemTextColor: '#6b7280',
    menuItemHoverBackgroundColor: '#f9fafb',
    menuItemHoverTextColor: '#111827',
    menuItemActiveBackgroundColor: 'color-mix(in srgb, var(--color-primary), white 90%)',
    menuItemActiveTextColor: 'var(--color-primary)',
    menuItemActiveBorderColor: 'color-mix(in srgb, var(--color-primary), white 80%)',
    subMenuItemPaddingLeft: '2rem',
  },
  // 头部样式
  header: {
    height: '4rem', // 64px
    backgroundColor: '#ffffff',
    borderColor: '#211f20',
    textColor: '#111827',
    paddingX: '2rem',

    // Admin Header Specifics
    admin: {
      height: '4rem',
      backgroundColor: '#ffffff',
      borderColor: '#211f20',
      textColor: '#111827',
      paddingX: '2rem',
    },
    // Web Header Specifics
    web: {
      height: '4rem',
      backgroundColor: '#ffffff',
      borderColor: '#211f20',
      textColor: '#111827',
      paddingX: '2rem',
    }
  },
  // 系统信息
  app: {
    name: 'Dong Admin', // 默认/全局名称
    logo: '/logo.svg',  // 默认/全局Logo
    tagline: '专注学习体验', // 全局标语

    // 后台管理系统配置
    admin: {
      name: 'Dong Admin',
      logoMode: 'logo', // 'text' | 'logo'
      logoLight: '/logo.svg',
      logoDark: '/logo.svg',
      logoMargins: {
        top: '0',
        right: '0.75rem',
        bottom: '0',
        left: '0'
      },
      showTagline: false, // 后台默认不显示标语
      showName: true // 是否显示系统名称
    },

    // 前台门户配置
    web: {
      name: 'Dong Web',
      logoMode: 'logo', // 'text' | 'logo'
      logoLight: '/logo.svg',
      logoDark: '/logo.svg',
      logoMargins: {
        top: '0',
        right: '0.5rem',
        bottom: '0',
        left: '0'
      },
      showTagline: false,
      showName: true, // 是否显示系统名称

      // 页脚 Logo 设置
      footerLogo: {
        show: true,
        logoLight: '/logo.svg',
        logoDark: '/logo.svg',
        mode: 'logo', // 'text' | 'logo'
        margins: {
          top: '0',
          right: '0.5rem',
          bottom: '0',
          left: '0'
        }
      }
    }
  }
})
