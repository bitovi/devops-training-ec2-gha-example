<script setup lang="ts">
export interface FeatureWithBullets {
  // the title of the feature
  title: string
  imgSrc: string
  imgAlt: string
  items: string[]
  linkText?: string
  linkUrl?: string
}
export interface Props {
  is?: any
  title: string
  imgSrc: string
  imgAlt: string
  items: string[]
  linkText?: string
  linkUrl?: string
  additionalClasses?: string
}
withDefaults(defineProps<Props>(), {
  is: 'div',
})
</script>

<template>
  <component
    :is="is"
    class="card-feature-2 flex flex-col bg-base-100 shadow-dark rounded-md max-w-[350px] px-7 py-10 lg:flex-1 flex-grow"
  >
    <img :src="imgSrc" :alt="imgAlt" />
    <h3 class="text-left heading-5 mt-9 mb-">{{ title }}</h3>
    <ul class="list-disc ml-7 my-4 flex-grow">
      <li v-for="item in items" :key="item" class="body-1">{{ item }}</li>
    </ul>

    <a v-if="linkText && linkUrl" :href="linkUrl" class="flex flex-row items-center label-lg gap-1.5 text-brand-2-100">
      {{ linkText }}
      <img src="/icons/arrow-right.svg" alt="Arrow pointing forward to the link destination." />
    </a>
  </component>
</template>
