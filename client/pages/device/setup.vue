<template>
  <div class="w-full max-w-5xl flex flex-col justify-center items-center ">
    <div class="w-full flex items-center my-4">
      <app-button-link to="/" bg="transparent">&larr; Back</app-button-link>
      <h2 class="ml-6 text-2xl font-bold">
        Set up a bottle
      </h2>
    </div>

    <div class="w-full flex -mx-2">
      <app-bottle-connect class="px-2" />
      <app-bottle-setup class="px-2" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    AppButtonLink: () => import('~/components/button/button-link.vue'),
    AppBottleConnect: () => import('~/components/bottle/connect.vue'),
    AppBottleSetup: () => import('~/components/bottle/setup.vue'),
  },
})
export default class PageDeviceSetup extends Vue {}
</script>

<style scoped>
.bottle-setup-enter-active,
.bottle-setup-leave-active {
  transition: opacity 0.3s;
  transform: translateX(0);
}

.bottle-setup-enter,
.bottle-setup-leave-active {
  opacity: 0;
  transform: translateX(30px);
}
</style>