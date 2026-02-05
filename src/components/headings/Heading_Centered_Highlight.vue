<script setup lang="ts">
export interface Props {
  title: string
}
const { title = '' } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center justify-center mb-16">
    <div class="flex flex-col items-center" style="">
      <h2 class="heading-3 text-center md:relative">{{ title }}</h2>
      <img src="/vectors/highlight-2-squiggle.svg" style="max-width: 308px" class="mt-2" />
    </div>
  </div>
</template>
