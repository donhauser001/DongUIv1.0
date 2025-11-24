<script setup lang="ts">
defineProps<{
  config: any
}>()

const typographyLevels = [
  { key: 'h1', label: '一级标题 (H1)', desc: '页面主标题' },
  { key: 'h2', label: '二级标题 (H2)', desc: '模块或分节标题' },
  { key: 'h3', label: '三级标题 (H3)', desc: '子版块标题' },
  { key: 'h4', label: '四级标题 (H4)', desc: '微标题' },
  { key: 'body', label: '正文 (Body)', desc: '默认文本' },
  { key: 'description', label: '描述 (Desc)', desc: '辅助说明文字' },
  { key: 'quote', label: '引用 (Quote)', desc: '引用块文本' },
]

const weights = [
  { value: '300', label: '细体 (Light)' },
  { value: '400', label: '常规 (Normal)' },
  { value: '500', label: '中等 (Medium)' },
  { value: '600', label: '半粗 (Semibold)' },
  { value: '700', label: '粗体 (Bold)' },
  { value: '800', label: '特粗 (ExtraBold)' },
]

const lineHeights = [
  { value: '1', label: '1 (Compact)' },
  { value: '1.25', label: '1.25 (Tight)' },
  { value: '1.375', label: '1.375 (Snug)' },
  { value: '1.5', label: '1.5 (Normal)' },
  { value: '1.625', label: '1.625 (Relaxed)' },
  { value: '2', label: '2 (Loose)' },
]

const margins = [
  { value: '0', label: '0' },
  { value: '0.25rem', label: '0.25rem' },
  { value: '0.5rem', label: '0.5rem' },
  { value: '0.75rem', label: '0.75rem' },
  { value: '1rem', label: '1rem' },
  { value: '1.25rem', label: '1.25rem' },
  { value: '1.5rem', label: '1.5rem' },
  { value: '2rem', label: '2rem' },
]
</script>

<template>
  <section class="grid-2">
    <!-- 左侧：详细设置 -->
    <div class="info-card form-group">
      
      <!-- 语义化排版设置 -->
      <div>
        <h3 class="nav-title" style="margin-bottom: 1rem;">排版等级 (Type Scale)</h3>
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div 
            v-for="level in typographyLevels" 
            :key="level.key" 
            class="form-group"
            style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);"
          >
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <label class="form-label" style="font-weight: 600;">{{ level.label }}</label>
              <span class="stat-label">{{ level.desc }}</span>
            </div>
            
            <div class="grid-3" style="gap: 0.75rem; margin-bottom: 0.75rem;">
              <!-- 字号 -->
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">字号</label>
                <select v-model="config.typography[level.key].size" class="form-input">
                  <option value="0.75rem">12px</option>
                  <option value="0.875rem">14px</option>
                  <option value="1rem">16px</option>
                  <option value="1.125rem">18px</option>
                  <option value="1.25rem">20px</option>
                  <option value="1.5rem">24px</option>
                  <option value="1.875rem">30px</option>
                  <option value="2.25rem">36px</option>
                </select>
              </div>
              
              <!-- 字重 -->
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">字重</label>
                <select v-model="config.typography[level.key].weight" class="form-input">
                  <option v-for="w in weights" :key="w.value" :value="w.value">{{ w.label }}</option>
                </select>
              </div>

              <!-- 行高 -->
              <div class="form-group" style="gap: 0.25rem;">
                <label class="stat-label">行高</label>
                <select v-model="config.typography[level.key].lineHeight" class="form-input">
                   <option v-for="lh in lineHeights" :key="lh.value" :value="lh.value">{{ lh.label }}</option>
                </select>
              </div>
            </div>

            <!-- 外边距设置 -->
            <div style="border-top: 1px dashed var(--color-border); padding-top: 0.75rem;">
              <p class="stat-label" style="margin-bottom: 0.5rem;">外边距 (Margin)</p>
              <div class="grid-4" style="gap: 0.5rem;">
                <div class="form-group" style="gap: 0.25rem;">
                  <label class="stat-label" style="font-size: 0.7rem;">上 (Top)</label>
                  <select v-model="config.typography[level.key].marginTop" class="form-input" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">
                    <option v-for="m in margins" :key="m.value" :value="m.value">{{ m.label }}</option>
                  </select>
                </div>
                <div class="form-group" style="gap: 0.25rem;">
                  <label class="stat-label" style="font-size: 0.7rem;">右 (Right)</label>
                  <select v-model="config.typography[level.key].marginRight" class="form-input" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">
                    <option v-for="m in margins" :key="m.value" :value="m.value">{{ m.label }}</option>
                  </select>
                </div>
                <div class="form-group" style="gap: 0.25rem;">
                  <label class="stat-label" style="font-size: 0.7rem;">下 (Bottom)</label>
                  <select v-model="config.typography[level.key].marginBottom" class="form-input" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">
                    <option v-for="m in margins" :key="m.value" :value="m.value">{{ m.label }}</option>
                  </select>
                </div>
                <div class="form-group" style="gap: 0.25rem;">
                  <label class="stat-label" style="font-size: 0.7rem;">左 (Left)</label>
                  <select v-model="config.typography[level.key].marginLeft" class="form-input" style="font-size: 0.75rem; padding: 0.25rem 0.5rem;">
                    <option v-for="m in margins" :key="m.value" :value="m.value">{{ m.label }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="border-top: 1px dashed var(--color-border); margin: 0.5rem 0;"></div>

      <!-- 全局行高设置 -->
      <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <h3 class="nav-title">全局行高 (Global Line Height)</h3>
        </div>
        
        <div class="form-group">
          <div style="display: flex; gap: 0.5rem;">
            <select v-model="config.typography.body.lineHeight" class="form-input">
              <option v-for="lh in lineHeights" :key="lh.value" :value="lh.value">{{ lh.label }}</option>
            </select>
          </div>
          <p class="stat-label">决定正文和默认文本的阅读呼吸感。</p>
        </div>
      </div>

      <!-- 全局段落设置 -->
      <div class="form-group" style="background: #f9fafb; padding: 1rem; border-radius: 0.75rem; border: 1px solid var(--color-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <h3 class="nav-title">段落间距 (Paragraph Spacing)</h3>
        </div>
        
        <div class="form-group">
          <div style="display: flex; gap: 0.5rem;">
            <select v-model="config.typography.paragraphSpacing" class="form-input">
              <option value="0">0 (None)</option>
              <option value="0.5rem">0.5rem (Compact)</option>
              <option value="0.75rem">0.75rem (Tight)</option>
              <option value="1rem">1rem (Normal)</option>
              <option value="1.25rem">1.25rem (Relaxed)</option>
              <option value="1.5rem">1.5rem (Loose)</option>
            </select>
          </div>
          <p class="stat-label">控制所有段落、标题和引用块底部的垂直间距。</p>
        </div>
      </div>
    </div>

    <!-- 右侧：实时预览 -->
    <div class="info-card" style="font-family: var(--font-family);">
      <h3 class="nav-title" style="margin-bottom: 1.5rem;">排版预览</h3>
      
      <div style="display: flex; flex-direction: column;">
        <!-- 语义化标签预览 -->
        <h1>一级标题：设计系统的排版美学</h1>
        
        <div class="text-desc">
          发布于 2024-03-20 · <span style="color: var(--color-primary);">UI 设计团队</span>
        </div>

        <h2>二级标题：视觉层级的重要性</h2>
        <p>
          优秀的排版不仅仅是选择漂亮的字体，更是关于建立清晰的信息层级。通过字号、字重和颜色的巧妙组合，我们可以引导用户的视线，让他们在阅读时感到舒适和愉悦。
        </p>

        <h3>三级标题：关键要素</h3>
        <p>
          在设计后台系统时，清晰的数字和关键状态尤为重要。
        </p>

        <h4>四级标题：细节处理</h4>
        <p>
          微小的调整往往能带来巨大的体验提升。
        </p>

        <blockquote>
          "排版是声音的视觉化。好的排版应该是透明的，让内容自己说话。"
        </blockquote>

        <!-- Add Lists -->
        <h3>列表展示</h3>
        <ul style="margin-bottom: var(--paragraph-spacing); padding-left: 1.5rem;">
            <li>无序列表项一：保持一致的垂直节奏</li>
            <li>无序列表项二：使用对齐增强可读性</li>
            <li>无序列表项三：注意留白的使用</li>
        </ul>

        <ol style="margin-bottom: var(--paragraph-spacing); padding-left: 1.5rem;">
            <li>有序列表项一：确定优先级</li>
            <li>有序列表项二：建立视觉流</li>
            <li>有序列表项三：引导用户操作</li>
        </ol>

        <!-- Add Code Block -->
        <h3>代码样式</h3>
        <pre style="background: var(--color-bg-tertiary); padding: 1rem; border-radius: var(--radius); margin-bottom: var(--paragraph-spacing); font-family: monospace; font-size: 0.875em; overflow-x: auto;"><code>const theme = {
  primary: 'var(--color-primary)',
  typography: 'system-ui'
};</code></pre>

        <!-- Add Inline Styles -->
        <h3>行内样式</h3>
        <p>
          文本可以包含 <strong>加粗</strong>、<em>斜体</em>、<u>下划线</u>、<s>删除线</s> 以及 <a href="#" style="color: var(--color-primary); text-decoration: underline;">超链接</a>。
          关键数据如 <span style="color: var(--color-error); font-weight: bold;">-12.5%</span> 或 <span style="color: var(--color-success); font-weight: bold;">+24.8%</span> 应突出显示。
        </p>

        <!-- Add Long Paragraphs -->
        <h3>多段落文本</h3>
        <p>
          第一段：这是为了测试段落间距而生成的一段长文本。在用户界面设计中，良好的排版能够显著提升用户的阅读体验。通过合理的行高和段间距，我们可以让视线在文本行之间流畅移动，减少阅读疲劳。
        </p>
        <p>
          第二段：当连续阅读多段文字时，段落之间的留白就显得尤为重要。它不仅起到了视觉分隔的作用，还给了读者一个短暂的“呼吸”机会。如果间距太小，文章会显得拥挤；如果太大，则会打断阅读的连续性。
        </p>
        <p>
          第三段：此外，字重和字号的搭配也需要仔细斟酌。标题应该足够醒目以引领视线，而正文则应保持克制以确保舒适。希望通过这个预览区域，您能找到最适合当前项目的排版组合。
        </p>

        <div style="margin-top: 1rem; display: flex; gap: 1rem; align-items: center;">
          <button class="btn-primary">
            主要操作
          </button>
          <button class="btn-outline">
            取消
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
