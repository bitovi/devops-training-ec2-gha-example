<script setup lang="ts">
export interface Props {
  is?: any
  /**
   * Classes to apply to the top-level component.
   */
  classes?: string
  /**
   * Contents for the heading text
   */
  title: string
  /**
   * Contents for the body of text under the header.
   */
  text: string
  /**
   * The image `src`. The image will only be visible if `imgAlt` is also provided.
   */
  imgSrc: string
  /**
   * The alt text for the image.
   */
  imgAlt: string
  /**
   * Additional classes to provide to the image.
   */
  imgClasses?: string
  /**
   * Text for the bottom link
   */
  linkText?: string
  /**
   * The URL for the bottom link
   */
  linkUrl?: string
}
withDefaults(defineProps<Props>(), {
  is: 'div',
})
</script>

<template>
  <component
    :is="is"
    class="card-feature-3 flex flex-col bg-base-100 shadow-dark rounded-md px-7 py-10 lg:flex-1 flex-grow"
    :class="classes"
  >
    <img v-if="imgSrc && imgAlt" :src="imgSrc" :alt="imgAlt" :class="imgClasses" />
    <h3 class="text-left heading-5 mt-2 mb-">{{ title }}</h3>
    <p class="my-4 flex-grow">
      {{ text }}
    </p>

    <a
      v-if="linkText && linkUrl"
      :href="linkUrl"
      class="flex flex-row items-center label-lg gap-1.5 text-brand-2-100"
    >
      {{ linkText }}
      <img src="/icons/arrow-right.svg" alt="Arrow pointing forward to the link destination." />
    </a>
  </component>
</template>
