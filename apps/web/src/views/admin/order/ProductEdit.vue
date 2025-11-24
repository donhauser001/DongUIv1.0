<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="product-edit-container">
    <div class="page-header">
        <h2 class="page-title">编辑商品</h2>
        <button class="btn-outline small-btn" @click="router.back()">返回列表</button>
    </div>

    <div class="edit-layout">
        <!-- Main Form -->
        <div class="layout-main">
            <!-- Basic Info -->
            <div class="card-base form-card">
                <h3 class="card-title">基本信息</h3>
                
                <div class="form-group">
                    <label class="form-label">商品名称</label>
                    <input type="text" class="input-base" value="DongUI 企业版">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">商品分类</label>
                        <select class="input-base">
                            <option>软件服务</option>
                            <option>实物商品</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">商品编码 (SPU)</label>
                        <input type="text" class="input-base" value="SPU-2023001">
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">商品详情</label>
                    <div class="editor-placeholder">
                        富文本编辑器区域
                    </div>
                </div>
            </div>

            <!-- Price & Stock -->
            <div class="card-base form-card">
                <h3 class="card-title">价格与库存</h3>
                
                <div class="price-row">
                    <div class="form-group">
                        <label class="form-label">销售价</label>
                        <div class="input-wrapper">
                            <span class="input-prefix">¥</span>
                            <input type="text" class="input-base input-with-prefix" value="1299.00">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">原价/划线价</label>
                        <div class="input-wrapper">
                             <span class="input-prefix">¥</span>
                            <input type="text" class="input-base input-with-prefix" value="1599.00">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">库存数量</label>
                        <input type="number" class="input-base" value="999">
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Sidebar -->
        <div class="layout-sidebar">
            <!-- Media -->
            <div class="card-base form-card">
                 <h3 class="card-title">商品图片</h3>
                 <div class="media-grid">
                     <div class="media-item primary-image group">
                         主图
                         <div class="media-overlay group-hover">更换</div>
                     </div>
                     <div class="media-item upload-placeholder">
                         <span class="i-carbon-add upload-icon"></span>
                     </div>
                 </div>
                 <p class="help-text">建议尺寸 800x800，支持 JPG/PNG</p>
            </div>

            <!-- Actions -->
            <div class="card-base form-card">
                <h3 class="card-title">发布设置</h3>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" checked class="checkbox-input">
                        立即上架
                    </label>
                    <label class="checkbox-label">
                        <input type="checkbox" class="checkbox-input">
                        推荐商品
                    </label>
                </div>
                <div class="action-buttons">
                    <button class="btn-primary full-width">保存商品</button>
                    <button class="btn-outline full-width">预览</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.product-edit-container {
  max-width: 64rem;
  margin: 0 auto;
  padding-bottom: 3rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.small-btn {
  font-size: var(--font-size-sm);
  padding: 0.375rem 0.75rem;
  height: auto;
}

.edit-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.layout-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-card {
  padding: 1.5rem;
}

.card-title {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
  margin: 0 0 1rem 0;
  font-size: var(--font-size-base);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.editor-placeholder {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  min-height: 200px;
  background-color: var(--color-bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
}

.price-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

.input-wrapper {
  position: relative;
}

.input-prefix {
  position: absolute;
  left: 0.75rem;
  top: 0.5rem;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
}

.input-with-prefix {
  padding-left: 2rem;
}

.layout-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.media-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.media-item {
  aspect-ratio: 1 / 1;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.primary-image {
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #3b82f6;
  font-size: var(--font-size-sm);
}

.media-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  border-radius: var(--radius);
}

.group:hover .group-hover {
  display: flex;
}

.upload-placeholder {
  background-color: var(--color-bg-tertiary);
  border: 1px dashed var(--color-border);
  color: var(--color-text-tertiary);
  transition: all 0.2s;
}

.upload-placeholder:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.upload-icon {
  font-size: 1.5rem;
}

.help-text {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
  margin-top: 0.5rem;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  cursor: pointer;
}

.checkbox-input {
  accent-color: var(--color-primary);
}

.action-buttons {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.full-width {
  width: 100%;
  justify-content: center;
}
</style>

