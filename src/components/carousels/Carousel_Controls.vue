<script setup lang="ts">
interface Props {
  index: number
  count: number
}
const props = defineProps<Props>()
const emit = defineEmits(['update:index'])

const handlePrev = () => {
  const newIndex = props.index - 1 < 1 ? 0 : props.index - 1
  emit('update:index', newIndex)
}
const handleNext = () => {
  const newIndex = props.index + 1 > props.count - 1 ? props.count - 1 : props.index + 1
  emit('update:index', newIndex)
}
</script>

<template>
  <div class="flex flex-row items-center gap-2.5">
    <button
      @click="handlePrev"
      class="transition-all duration-300"
      :class="[index === 0 ? 'opacity-20' : '']"
    >
      <img src="/icons/chevron-left.svg" alt="Chevron arrow pointing left" />
    </button>
    <div class="flex flex-row items-center gap-1">
      <button
        type="button"
        v-for="item in count"
        :key="item"
        class="p-1 rounded-full hover:bg-gray-200"
        @click="$emit('update:index', item - 1)"
      >
        <div
          class="h-2.5 w-2.5 rounded-full transition-all duration-300"
          :class="[index == item - 1 ? 'bg-brand-1-600 scale-120' : 'bg-gray-400']"
        ></div>
      </button>
    </div>
    <button
      @click="handleNext"
      class="transition-all duration-300"
      :class="[index === count - 1 ? 'opacity-20' : '']"
    >
      <img src="/icons/chevron-right.svg" alt="Chevron arrow pointing right" />
    </button>
  </div>
</template>
