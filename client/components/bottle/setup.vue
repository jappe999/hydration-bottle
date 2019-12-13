<template>
  <div class="w-full">
    <ol>
      <li>
        Empty bottle.
      </li>
      <li>
        Fill bottle completely.
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { watch } from '~/plugins/bluetooth'

@Component
export default class AppBottleSetup extends Vue {}
</script>