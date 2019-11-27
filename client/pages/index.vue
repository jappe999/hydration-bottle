<template>
  <div class="min-h-full flex flex-col justify-center items-center">
    <h3 class="text-4xl">Welcome, {{ $auth.user.username }}</h3>

    <div class="text-center">
      <p class="mb-6">You haven't set up a device yet.</p>
      <app-button-link to="/device/setup">
        Set up a device
      </app-button-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    AppButton: () => import('~/components/button/button.vue'),
    AppButtonLink: () => import('~/components/button/button-link.vue'),
    AppCard: () => import('~/components/card/card.vue'),
    AppCardContent: () => import('~/components/card/card-content.vue'),
    AppLabelledCheckbox: () =>
      import('~/components/form/labelled-checkbox.vue'),
    AppInput: () => import('~/components/form/input.vue'),
  },
})
export default class PageIndex extends Vue {}
</script>
