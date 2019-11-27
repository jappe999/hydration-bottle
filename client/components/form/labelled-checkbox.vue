<template>
  <label class="h-full flex items-center cursor-pointer select-none">
    <input v-model="isChecked" type="checkbox" class="hidden" />
    <div
      :class="{
        'bg-blue-500': isChecked,
        'bg-white': !isChecked,
      }"
      class="h-6 w-6 flex items-center justify-center mr-4 my-2 p-1 border border-gray-500 rounded-full"
    >
      <svg
        v-if="isChecked"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        class="h-3 fill-current"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
    </div>
    <span class="p-2"><slot /></span>
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class AppLabelledCheckbox extends Vue {
  get isChecked(): boolean {
    return this.value
  }

  set isChecked(value) {
    this.$emit('input', value)
  }

  @Prop({ default: false, type: Boolean }) value!: boolean
}
</script>

<style lang="postcss"></style>
