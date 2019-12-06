<template>
  <div class="w-full flex flex-col justify-center items-center ">
    <div class="w-full max-w-sm my-4">
      <app-button-link to="/" bg="transparent">&larr; Back</app-button-link>
    </div>
    <app-bottle-connect />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    AppButtonLink: () => import('~/components/button/button-link.vue'),
    AppBottleConnect: () => import('~/components/bottle/connect.vue'),
  },
})
export default class PageDeviceSetup extends Vue {}
</script>
