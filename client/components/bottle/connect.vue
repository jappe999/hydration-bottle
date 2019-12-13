<template>
  <div class="w-full max-w-sm flex flex-col justify-center items-center">
    <app-card class="w-full">
      <app-card-content class="py-6">
        <h2 class="text-2xl font-bold -mt-2 mb-4">
          Set up a bottle
        </h2>
        <div v-if="bottle.errors.any()" class="mb-4">
          <div
            v-for="[field, errors] in Object.entries(bottle.errors.all())"
            :key="field"
            class="mb-2"
          >
            <small v-for="error in errors" :key="error">
              {{ error }}
            </small>
          </div>
        </div>
        <form @submit.prevent="connect">
          <app-input v-model="bottle.code" label="Code" required />

          <app-input v-model="bottle.name" label="Name" required />

          <div class="flex justify-end">
            <app-button :loading="bottle.busy" type="submit" class="font-bold">
              Connect
            </app-button>
          </div>
        </form>
      </app-card-content>
    </app-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Mutation, Action } from 'vuex-class'
import { BottleCreate } from '~/models/Bottle'
import * as types from '~/store/mutation-types'
import { Form } from '../../plugins'
import { connect, watch } from '~/plugins/bluetooth'

@Component({
  components: {
    AppDebug: () => import('~/components/debug.vue'),
    AppCard: () => import('~/components/card/card.vue'),
    AppCardContent: () => import('~/components/card/card-content.vue'),
    AppInput: () => import('~/components/form/input.vue'),
    AppButton: () => import('~/components/button/button.vue'),
  },
})
export default class AppBottleConnnect extends Vue {
  debugOutput: any[] = []

  bottle = new Form<BottleCreate>({
    code: '',
    name: '',
  })

  @Mutation(`bottles/${types.ADD_BOTTLE}`) addBottle: (bottle) => void

  @Action('bluetooth/connectToServer') connectToServer: (device) => Promise<any>
  @Action('bluetooth/watch') watch: (
    serviceUUID,
    charUUID,
    callback,
  ) => Promise<any>

  log(value: string) {
    this.debugOutput.push(value)
  }

  handleChange(event) {
    const value = event.target.value
    const weight = value.getUint8(0) * 10
    alert('> Weight is ' + weight + ' grams')
  }

  async connect() {
    if ('bluetooth' in navigator) {
      try {
        const server = await connect(this.bottle.data().code)
        this.log(`Connection with ${server.device.name} successful.`)

        this.bottle.fill({
          ...this.bottle.data(),
          code: server.device.name,
        })
        this.saveBottle()
      } catch (e) {
        this.log(e)
      }
    } else {
      this.bottle.errors.set(
        'Bluetooth',
        'Your device does not support bluetooth. Please try again on another device.',
      )
    }
  }

  async saveBottle() {
    this.bottle.startProcessing()

    try {
      const { data: bottle } = await this.bottle.post('/bottles')
      this.addBottle(bottle)
      this.$router.push(`/device/${bottle.id}`)
    } catch ({ response }) {
      if (response.status === 400) {
        this.bottle.errors.set('name', response.data.message)
      }
    } finally {
      this.bottle.finishProcessing()
    }
  }
}
</script>
