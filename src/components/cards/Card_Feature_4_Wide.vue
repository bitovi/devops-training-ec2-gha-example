<script setup lang="ts">
export interface Props {
  title: string
  imgSrc: string
  imgAlt: string
  text: string
  linkText?: string
  linkUrl?: string
}
defineProps<Props>()
</script>

<template>
  <div class="card-feature-4 bg-base-100 shadow-dark rounded-md px-7 py-10">
    <div class="flex flex-col md:flex-row justify-center gap-7">
      <div class="flex justify-center md:block">
        <img :src="imgSrc" :alt="imgAlt" />
      </div>

      <div class="flex flex-col">
        <h3 class="text-left heading-5 mt-2">{{ title }}</h3>
        <div class="mt-2 mb-6 lead-1">{{ text }}</div>

        <a v-if="linkText && linkUrl" :href="linkUrl" class="label-lg flex flex-row items-center text-brand-2-100">
          {{ linkText }}
          <img src="/icons/arrow-right.svg" alt="Arrow pointing forward to the link destination." />
        </a>
      </div>
    </div>
  </div>
</template>
