<template>
  <nuxt-link
    :class="
      `px-6 py-2 rounded-xl text-${color} hover:text-${colorHover} focus:text-${colorHover} bg-${bg} hover:bg-${bgHover} focus:bg-${bgHover} shadow transition`
    "
    :to="to"
  >
    <slot></slot>
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class AppButtonLink extends Vue {
  @Prop(String) to!: string
  @Prop({ default: 'blue-800', type: String }) bg!: string
  @Prop({ default: 'blue-900', type: String }) bgHover!: string
  @Prop({ default: 'white', type: String }) color!: string
  @Prop({ default: 'white', type: String }) colorHover!: string
}
</script>
