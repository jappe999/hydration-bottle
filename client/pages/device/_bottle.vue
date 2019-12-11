<template>
  <app-card>
    <app-card-content>
      <h1>{{ bottle.name }}</h1>
    </app-card-content>
  </app-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { BottleView } from '~/models/Bottle'
import * as types from '~/store/mutation-types'

@Component({
  components: {
    AppCard: () => import('~/components/card/card.vue'),
    AppCardContent: () => import('~/components/card/card-content.vue'),
  },
})
export default class DevicePage extends Vue {
  get bottle() {
    return this.$store.getters['bottles/bottle'](this.$route.params.bottle)
  }

  @Action(`bottles/${types.FETCH_BOTTLE}`) fetchBottle: (
    id: string,
  ) => BottleView

  mounted() {
    this.fetchBottle(this.$route.params.bottle)
  }
}
</script>
