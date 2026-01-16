<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  initialWidth: {
    type: String,
    default: '100%'
  },
  minWidth: {
    type: Number,
    default: 300
  }
});

const containerRef = ref(null);
const width = ref(props.initialWidth);
const displayWidth = ref('0');
const isDragging = ref(false);
const dragSide = ref(null);

const startDrag = (e, side) => {
  isDragging.value = true;
  dragSide.value = side;
  e.preventDefault();
};

const onDrag = (e) => {
  if (!isDragging.value || !containerRef.value) return;
  
  const rect = containerRef.value.getBoundingClientRect();
  const paddingTotal = 42; // 21px left + 21px right
  let newWidth;
  
  if (dragSide.value === 'right') {
    newWidth = e.clientX - rect.left;
  } else {
    newWidth = rect.right - e.clientX;
  }
  
  if (newWidth < props.minWidth) {
    newWidth = props.minWidth;
  }
  
  // Get parent width to respect max-width constraint
  const parentWidth = containerRef.value.parentElement?.offsetWidth || Infinity;
  if (newWidth > parentWidth) {
    newWidth = parentWidth;
  }
  
  width.value = `${newWidth}px`;
  displayWidth.value = `${Math.round(newWidth - paddingTotal)}px`;
};

const stopDrag = () => {
  isDragging.value = false;
  dragSide.value = null;
};

onMounted(() => {
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
  
  // Get initial pixel width
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect();
    const paddingTotal = 42; // 21px left + 21px right
    displayWidth.value = `${Math.round(rect.width - paddingTotal)}px`;
  }
});

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
});
</script>

<template>
  <div class="resizable-wrapper">
    <div 
      ref="containerRef" 
      class="resizable-container" 
      :style="{ width }"
      :class="{ dragging: isDragging }"
    >
      <div class="resize-handle left" @mousedown="startDrag($event, 'left')">
        <div class="resize-handle-line"></div>
      </div>
      <slot />
      <div class="resize-handle right" @mousedown="startDrag($event, 'right')">
        <div class="resize-handle-line"></div>
      </div>
    </div>
    <div class="width-indicator">Width: {{ displayWidth }}</div>
  </div>
</template>

<style scoped>
.resizable-wrapper {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.resizable-container {
  position: relative;
  border: 2px dashed rgb(200 200 200 / 0.4 );
  border-radius: 8px;
  padding: 0 21px;
  transition: border-color 0.2s;
  max-width: 100%;
}

.resizable-container.dragging {
  border-color: #667eea;
  user-select: none;
}

.resize-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ew-resize;
  background: transparent;
  transition: background 0.2s;
}

.resize-handle.left {
  left: 0;
}

.resize-handle.right {
  right: 0;
}

.resize-handle:hover {
  background: rgb(102 126 234 / 0.6);
}

.resize-handle-line {
  width: 4px;
  height: 40px;
  background: #667eea;
  border-radius: 2px;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.resize-handle:hover .resize-handle-line,
.resizable-container.dragging .resize-handle-line {
  opacity: 1;
}

.width-indicator {
  margin-top: 8px;
  font-size: 14px;
  font-family: monospace;
}
</style>
