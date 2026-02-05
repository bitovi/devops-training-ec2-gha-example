<script setup lang="ts">
import CardFeature2 from './Card_Feature_2.vue'

export interface Props {
  features: any[]
}
const { features = [] } = defineProps<Props>()
</script>

<template>
  <ul class="inline-flex flex-row flex-wrap gap-4 md:items-stretch justify-center mb-7">
    <CardFeature2
      v-for="feature in features"
      :key="feature.title"
      is="li"
      :title="feature.title"
      :imgSrc="feature.imgSrc"
      :imgAlt="feature.imgAlt"
      :items="feature.items"
      :linkText="feature.linkText"
      :linkUrl="feature.linkUrl"
    />
  </ul>
</template>
