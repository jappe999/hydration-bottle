<template>
  <div class="w-full flex flex-col justify-center items-center ">
    <app-bottle-connect />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    AppBottleConnect: () => import('~/components/bottle/connect.vue'),
  },
})
export default class PageDeviceSetup extends Vue {}
</script>
