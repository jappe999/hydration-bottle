<template>
  <app-card-content>
    <div class="text-center">
      <h1 class="text-3xl font-bold">{{ bottle.name }}</h1>
      <small>Connected</small>
    </div>
    <app-card>
      <app-card-content></app-card-content>
    </app-card>
  </app-card-content>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { BottleView } from '~/models/Bottle'
import * as types from '~/store/mutation-types'

@Component({
  components: {
    AppCard: () => import('~/components/card/card.vue'),
    AppCardContent: () => import('~/components/card/card-content.vue'),
  },
})
export default class DevicePage extends Vue {
  @Getter('bottles/bottle') bottle: (id: string) => BottleView

  @Action('bottles/fetchBottle') fetchBottle: (id: string) => BottleView

  mounted() {
    this.fetchBottle(this.$route.params.bottle)
  }
}
</script>
