<script setup lang="ts">
const mediaItems = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  title: `素材图片_${i + 1}.jpg`,
  size: '2.4 MB',
  dim: '1920x1080',
  // Replacing Tailwind classes with custom classes or inline styles could work,
  // but here I'll map them to a class name that I define in <style>
  colorClass: ['bg-color-1', 'bg-color-2', 'bg-color-3', 'bg-color-4', 'bg-color-5'][i % 5]
}))
</script>

<template>
  <div class="media-container">
    <!-- Toolbar -->
    <div class="media-toolbar">
      <div class="toolbar-left">
        <h2 class="toolbar-title">媒体库</h2>
        <div class="divider"></div>
        <div class="filter-tabs">
          <button class="filter-btn">全部</button>
          <button class="filter-btn">图片</button>
          <button class="filter-btn">视频</button>
          <button class="filter-btn">文档</button>
        </div>
      </div>
      <div class="toolbar-right">
        <div class="view-toggles">
          <button class="view-btn active"><span class="i-carbon-grid"></span></button>
          <button class="view-btn"><span class="i-carbon-list"></span></button>
        </div>
        <button class="btn-primary small-btn">
          <span class="i-carbon-upload mr-1"></span> 上传
        </button>
      </div>
    </div>

    <!-- Grid Layout -->
    <div class="media-grid">
      <div v-for="item in mediaItems" :key="item.id" class="media-card">
        <!-- Preview Area -->
        <div class="preview-area" :class="item.colorClass">
          <span class="i-carbon-image preview-icon"></span>
          
          <!-- Overlay Actions -->
          <div class="overlay">
            <button class="overlay-btn"><span class="i-carbon-view"></span></button>
            <button class="overlay-btn btn-danger"><span class="i-carbon-trash-can"></span></button>
          </div>

          <!-- Select Checkbox -->
          <div class="checkbox-wrapper">
            <input type="checkbox" class="checkbox-input">
          </div>
        </div>

        <!-- Info Area -->
        <div class="info-area">
          <h4 class="media-title" :title="item.title">{{ item.title }}</h4>
          <div class="media-meta">
            <span>{{ item.size }}</span>
            <span>{{ item.dim }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.media-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.media-toolbar {
  background-color: var(--color-bg-primary);
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar-left {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.toolbar-title {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.divider {
  height: 1rem;
  width: 1px;
  background-color: var(--color-border);
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.filter-btn:hover {
  color: var(--color-primary);
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.view-toggles {
  display: flex;
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius);
  padding: 0.25rem;
}

.view-btn {
  padding: 0.25rem;
  border-radius: var(--radius);
  border: none;
  background: none;
  color: var(--color-text-tertiary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-btn:hover {
  color: var(--color-text-secondary);
}

.view-btn.active {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.small-btn {
  font-size: var(--font-size-sm);
  padding: 0.375rem 0.75rem;
  height: auto;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.media-card {
  position: relative;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: all 0.2s;
}

.media-card:hover {
  box-shadow: var(--card-shadow);
  border-color: var(--color-primary);
}

.preview-area {
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.preview-icon {
  font-size: 2.25rem;
  color: white;
  opacity: 0.5;
}

/* Mock Colors */
.bg-color-1 { background-color: #fca5a5; }
.bg-color-2 { background-color: #93c5fd; }
.bg-color-3 { background-color: #86efac; }
.bg-color-4 { background-color: #fde047; }
.bg-color-5 { background-color: #d8b4fe; }

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.media-card:hover .overlay {
  opacity: 1;
}

.overlay-btn {
  padding: 0.5rem;
  border-radius: 50%;
  background-color: white;
  color: var(--color-text-primary);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.overlay-btn:hover {
  color: var(--color-primary);
}

.overlay-btn.btn-danger:hover {
  color: var(--color-error);
}

.checkbox-wrapper {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.media-card:hover .checkbox-wrapper {
  opacity: 1;
}

.checkbox-input {
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border: 1px solid white;
  cursor: pointer;
}

.info-area {
  padding: 0.75rem;
}

.media-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 0 0.25rem 0;
}

.media-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.625rem;
  color: var(--color-text-tertiary);
}
</style>

