<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { MotionRail as MotionRailClass } from "./motionrail";
import type { MotionRailOptions } from "./lib/types";

interface Props {
  options?: MotionRailOptions;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({}),
});

const emit = defineEmits<{
  mounted: [instance: MotionRailClass, container: HTMLDivElement];
}>();

const containerRef = ref<HTMLDivElement | null>(null);
const motionRailInstance = ref<MotionRailClass | null>(null);

onMounted(() => {
  if (!containerRef.value) return;

  motionRailInstance.value = new MotionRailClass(
    containerRef.value,
    props.options,
  );
  emit("mounted", motionRailInstance.value, containerRef.value);
});

onBeforeUnmount(() => {
  if (motionRailInstance.value) {
    motionRailInstance.value.destroy();
    motionRailInstance.value = null;
  }
});

defineExpose({
  instance: motionRailInstance,
  container: containerRef,
});
</script>

<template>
  <div ref="containerRef" data-motion-rail v-bind="$attrs">
    <div data-motion-rail-scrollable>
      <div data-motion-rail-grid>
        <slot />
      </div>
    </div>
  </div>
</template>

