<template>
  <div :class="`bg-${bg} rounded-xl shadow-lg text-${color}`">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AppCard extends Vue {
  @Prop({ default: 'gray-800', type: String }) bg!: string
  @Prop({ default: 'gray-100', type: String }) color!: string
}
</script>
