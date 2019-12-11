<template>
  <ul ref="debug" class="h-96 overflow-y-auto text-white">
    <li v-for="(line, index) in output" :key="index">{{ line }}</li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  watch: {
    output() {
      // @ts-ignore
      this.$refs.debug.scrollTop = this.$refs.debug.scrollHeight
    },
  },
})
export default class AppDebugOutput extends Vue {
  @Prop({ type: Array, default: () => [] }) output!: any[]
}
</script>
