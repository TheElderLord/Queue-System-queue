<template>
  <div class="marquee" ref="marquee">
    <div class="marquee-inner" ref="marqueeInner">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, nextTick } from 'vue';

export default defineComponent({
  name: 'RunningLine',
  setup() {
    const marquee = ref<HTMLDivElement | null>(null);
    const marqueeInner = ref<HTMLDivElement | null>(null);

    const startMarquee = () => {
      if (marquee.value && marqueeInner.value) {
        const innerWidth = marqueeInner.value.offsetWidth;
        const containerWidth = marquee.value.offsetWidth;

        // Set initial position
        marqueeInner.value.style.transform = `translateX(${containerWidth}px)`;

        // Start the animation
        const duration = (innerWidth + containerWidth) / 100; // Adjust speed here
        marqueeInner.value.style.transition = `transform ${duration}s linear`;
        marqueeInner.value.style.transform = `translateX(-${innerWidth}px)`;

        marqueeInner.value.addEventListener('transitionend', resetMarquee);
      }
    };

    const resetMarquee = () => {
      if (marquee.value && marqueeInner.value) {
        const containerWidth = marquee.value.offsetWidth;

        // Reset the animation
        marqueeInner.value.style.transition = 'none';
        marqueeInner.value.style.transform = `translateX(${containerWidth}px)`;

        // Force a reflow
        nextTick(() => {
          const innerWidth = marqueeInner.value!.offsetWidth;
          const duration = (innerWidth + containerWidth) / 100; // Adjust speed here
          marqueeInner.value!.style.transition = `transform ${duration}s linear`;
          marqueeInner.value!.style.transform = `translateX(-${innerWidth}px)`;
        });
      }
    };

    onMounted(() => {
      startMarquee();
    });

    return {
      marquee,
      marqueeInner
    };
  }
});
</script>

<style scoped>
* {
  font-size: 40px;
  font-weight: bold;
}
.marquee {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
}

.marquee-inner {
  display: inline-block;
}
</style>
