<script setup lang="ts">
defineProps<{
  config: any
}>()
</script>

<template>
  <section class="grid-2">
    <div class="info-card form-group">
      <div class="form-group">
        <label class="form-label">表头背景</label>
        <input
          v-model="config.table.headerBackgroundColor"
          type="text"
          class="form-input"
          style="font-family: monospace;"
        />
      </div>
      <div class="form-group">
        <label class="form-label">行高</label>
        <input
          v-model="config.table.rowHeight"
          type="text"
          class="form-input"
        />
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <input
          v-model="config.table.zebraStripe"
          type="checkbox"
          style="width: 1rem; height: 1rem;"
        />
        <span class="form-label">启用斑马纹</span>
      </div>
      <div v-if="config.table.zebraStripe" class="form-group">
        <label class="form-label">斑马纹颜色</label>
        <input
          v-model="config.table.zebraStripeColor"
          type="text"
          class="form-input"
          style="font-family: monospace;"
        />
      </div>
    </div>
    <div class="info-card">
      <h3 class="nav-title" style="margin-bottom: 1rem;">表格预览</h3>
      <table class="table-wrapper">
        <thead :style="{ backgroundColor: config.table.headerBackgroundColor }">
          <tr>
            <th style="padding-left: 0.75rem; border-bottom: 1px solid var(--color-border);">姓名</th>
            <th style="padding-left: 0.75rem; border-bottom: 1px solid var(--color-border);">邮箱</th>
            <th style="padding-left: 0.75rem; border-bottom: 1px solid var(--color-border);">角色</th>
          </tr>
        </thead>
          <tbody>
            <tr
              v-for="row in [
                { module: '主题变量热加载', status: '进行中', owner: '前端团队', updatedAt: '2025-11-24' },
                { module: 'AI 文档摘要', status: '已上线', owner: 'AI 平台组', updatedAt: '2025-11-22' },
                { module: '数据大屏', status: '设计中', owner: '数据体验', updatedAt: '2025-11-18' },
              ]"
              :key="row.module + 'table'"
              style="border-bottom: 1px solid var(--color-border);"
              :style="{
                backgroundColor: config.table.zebraStripe ? config.table.zebraStripeColor : 'transparent',
              }"
            >
              <td style="padding-left: 0.75rem;">{{ row.owner }}</td>
              <td style="padding-left: 0.75rem;">team@dong.com</td>
              <td style="padding-left: 0.75rem;">{{ row.status }}</td>
            </tr>
          </tbody>
      </table>
    </div>
  </section>
</template>

