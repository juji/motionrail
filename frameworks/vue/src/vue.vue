<script setup lang="ts">
import {
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
  useSlots,
  computed,
} from "vue";
import { MotionRail as MotionRailClass } from "motionrail";
import type { MotionRailOptions } from "motionrail";

interface Props {
  options?: MotionRailOptions;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({}),
});

const emit = defineEmits<{
  mounted: [instance: MotionRailClass, container: HTMLDivElement];
}>();

const slots = useSlots();
const containerRef = ref<HTMLDivElement | null>(null);
const motionRailInstance = ref<MotionRailClass | null>(null);

onMounted(() => {
  if (!containerRef.value) return;
  const instance = new MotionRailClass(containerRef.value, props.options);
  motionRailInstance.value = instance;
  emit("mounted", instance, containerRef.value);
});
// Compute style for scrollable div (for containerName)
const scrollableStyle = computed(() => {
  return props.options?.containerName
    ? { containerName: props.options.containerName }
    : {};
});

watch(
  () => slots.default?.(),
  () => {
    if (motionRailInstance.value) {
      motionRailInstance.value.update();
    }
  },
  { flush: "post" },
);

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
  <div ref="containerRef" data-motionrail v-bind="$attrs">
    <div data-motionrail-scrollable :style="scrollableStyle">
      <div data-motionrail-grid>
        <slot />
      </div>
    </div>
  </div>
</template>
