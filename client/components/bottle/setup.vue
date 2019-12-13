<template>
  <div class="w-full">
    <ol>
      <li :class="{ 'text-bold': isStep('empty') }">
        Empty bottle.
      </li>
      <li :class="{ 'text-bold': isStep('filled') }">
        Fill bottle completely.
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { watch } from '~/plugins/bluetooth'

@Component
export default class AppBottleSetup extends Vue {
  getEmptyWeight() {
    watch(0x181d, 0x2a98, e => {
      const weight = e.target.value.getUInt8(0)
      console.log(weight)
    })
  }
}
</script>