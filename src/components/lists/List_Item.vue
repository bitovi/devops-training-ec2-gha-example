<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
  title: string
  titleClasses?: string
  description: string
  size?: string
  inline?: boolean
  iconSrc?: string
  iconAlt?: string
}
const props = withDefaults(defineProps<Props>(), {
  size: 'sm',
})

const classes = computed(() => ({
  'gap-4': props.size === 'sm',
  gap8: props.size === 'lg',
}))
const iconClasses = computed(() => {
  return {
    'h-13 w-13': props.size === 'sm',
    'h-18 w-18': props.size === 'lg',
  }
})
const _titleClasses = computed(() => ({
  'body-1 font-bold inline': props.inline,
  'heading-6': !props.inline,
}))
</script>

<template>
  <li class="list-none flex flex-row" :class="classes">
    <div class="flex-shrink-0 items-center justify-center flex" :class="iconClasses">
      <slot name="icon">
        <img :src="iconSrc" :alt="iconAlt" />
      </slot>
    </div>
    <div class="" :class="[inline ? 'gap-2' : 'flex flex-col']">
      <p class="heading-6" :class="[titleClasses, _titleClasses]">{{ title }}</p>
      <p class="body-1" :class="{ inline: inline }">{{ description }}</p>
    </div>
  </li>
</template>
