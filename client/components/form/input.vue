<template>
  <label for="name" class="flex flex-col items-start">
    <span
      v-if="label"
      class="px-3 py-1 rounded-t text-sm text-gray-100 bg-gray-600 shadow"
    >
      {{ label }}
    </span>
    <input
      :id="name"
      :type="type"
      :name="name"
      :value="value"
      @input="input"
      :class="
        `w-full mb-4 px-3 py-2 appearance-none rounded-r ${!label &&
          'rounded-t'} rounded-b border-t-1 border-gray-200 focus:border-gray-200 text-${color} focus:text-${colorFocus} bg-${bg} focus:bg-${bgFocus} shadow transition`
      "
    />
  </label>
</template>

<script lang="ts">
import { Vue, Prop, Component, Emit } from 'vue-property-decorator'

@Component
export default class AppInput extends Vue {
  @Prop({ type: String, default: 'text' }) readonly type!: string
  @Prop(String) readonly name!: string
  @Prop({ type: String, default: null }) readonly label!: string
  @Prop([String, Number]) readonly value!: string
  @Prop({ default: 'gray-700', type: String }) bg!: string
  @Prop({ default: 'gray-700', type: String }) bgFocus!: string
  @Prop({ default: 'gray-100', type: String }) color!: string
  @Prop({ default: 'gray-300', type: String }) colorFocus!: string

  @Emit()
  input({ target: { value } }) {
    return value
  }
}
</script>
