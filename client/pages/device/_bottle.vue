<template>
  <app-card-content>
    <div class="text-center mb-4">
      <h1 class="text-3xl font-bold">{{ bottle.name }}</h1>
      <small>{{ bottle.code }}</small>
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
import { MeasurementCreate, MeasurementView } from '~/models/Measurement'
import { connect, watch } from '../../plugins/bluetooth'

@Component({
  components: {
    AppCard: () => import('~/components/card/card.vue'),
    AppCardContent: () => import('~/components/card/card-content.vue'),
  },
})
export default class DevicePage extends Vue {
  @Getter('bottles/bottle') bottle: (id: string) => BottleView

  @Action('bottles/fetchBottle') fetchBottle: (id: string) => BottleView

  @Action('measurements/storeMeasurement') storeMeasurement: (
    measurement: MeasurementCreate,
  ) => Promise<MeasurementView>

  async mounted() {
    const bottle = await this.fetchBottle(this.$route.params.bottle)
    const server = await connect(bottle.code)
    watch(0x181d, 0x2a98, e => {
      const weight = e.target.value.getUInt8(0) * 10
      this.storeMeasurement({ bottleId: bottle.id, weight })
    })
  }
}
</script>
