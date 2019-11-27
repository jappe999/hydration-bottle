<template>
  <div :class="`h-full p-${gap}`">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AppCardContent extends Vue {
  @Prop({ type: Number, default: 4 }) gap!: number
}
</script>
