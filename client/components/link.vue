<template>
  <nuxt-link
    :class="
      `px-0 py-1 text-${color} hover:text-${colorHover} focus:text-${colorHover} border-b border-transparent hover:border-${colorHover} focus:border-${colorHover}`
    "
    :to="to"
  >
    <slot></slot>
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class AppLink extends Vue {
  @Prop(String) to!: string
  @Prop({ default: 'white', type: String }) color!: string
  @Prop({ default: 'gray-300', type: String }) colorHover!: string
}
</script>
