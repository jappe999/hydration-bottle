<template>
  <app-card-content>
    <div class="text-center mb-4">
      <h1 class="text-3xl font-bold">{{ bottle.name }}</h1>
      <small>{{ bottle.code }}</small>
    </div>

    <app-card class="flex">
      <app-card-content class="text-center border-r border-gray-900">
        <h3 class="text-2xl font-bold">Times used in a week</h3>
        <line-chart class="p-8" :chart-data="dataCollection" />
      </app-card-content>
      <app-card-content class="text-center">
        <h3 class="text-2xl font-bold">Times used today</h3>
        <bar-chart class="p-8" :chart-data="dataToday" />
      </app-card-content>
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
    LineChart: () => import('~/components/charts/linechart.js'),
    BarChart: () => import('~/components/charts/barchart.js'),
  },
})
export default class DevicePage extends Vue {
  dataCollection = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    datasets: [
      {
        label: '',
        backgroundColor: '#BCDEFA',
        data: [
          this.getRandomInt(),
          this.getRandomInt(),
          this.getRandomInt(),
          this.getRandomInt(),
          this.getRandomInt(),
          this.getRandomInt(),
          this.getRandomInt(),
        ],
      },
    ],
  }
  dataToday = {
    labels: [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
    ],
    datasets: [
      {
        label: '',
        backgroundColor: '#6574CD',
        data: [],
      },
    ],
  }

  @Getter('bottles/bottle') bottle: (id: string) => BottleView

  @Action('bottles/fetchBottle') fetchBottle: (id: string) => BottleView

  @Action('measurements/storeMeasurement') storeMeasurement: (
    measurement: MeasurementCreate,
  ) => Promise<MeasurementView>

  async mounted() {
    const bottle = await this.fetchBottle(this.$route.params.bottle)
    const server = await connect(bottle.code)
    await watch(0x181d, 0x2a98, e => {
      const weight = e.target.value.getUint8(0) * 10
      this.storeMeasurement({ bottleId: bottle.id, weight })
    })
  }

  getRandomInt() {
    return Math.floor(Math.random() * (5000 - 5 + 1)) + 5
  }
}
</script>
