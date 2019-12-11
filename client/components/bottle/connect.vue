<template>
  <div class="w-full max-w-sm flex flex-col justify-center items-center">
    <app-card class="w-full">
      <app-card-content>
        <h2 class="text-2xl font-bold mb-4">
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

    <app-debug :output="debugOutput" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Form } from '../../plugins'

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
  $auth: any

  debugOutput: any[] = []

  bottle = new Form({
    code: '',
    name: '',
  })

  log(value: string) {
    this.debugOutput.push(value)
  }

  handleChange(event) {
    const value = event.target.value
    const level = value.getUint8(0)
    this.log('> Pressure is ' + level)
  }

  connect() {
    if ('bluetooth' in navigator) {
      // @ts-ignore
      navigator.bluetooth
        .requestDevice({
          filters: [
            {
              namePrefix: this.bottle.data().code,
            },
          ],
          optionalServices: [0x180f, 0x181d],
        })
        .then(device => {
          this.log(`Connection with ${device.name} successful.`)
          return device.gatt.connect()
        })
        .then(server => server.getPrimaryService(0x181d))
        .then(service => {
          return service.getCharacteristic(0x2a98)
        })
        .then(characteristic => characteristic.startNotifications())
        .then(characteristic => {
          characteristic.addEventListener(
            'characteristicvaluechanged',
            this.handleChange.bind(this),
          )
        })
        .catch(e => {
          this.log('Error' + JSON.stringify(e.toString()))
        })
    } else {
      this.bottle.errors.set(
        'Bluetooth',
        'Your device does not support bluetooth. Please try again on another device.',
      )
    }
  }

  async saveDevice() {
    this.bottle.startProcessing()

    try {
      await this.bottle.post('/api/bottle')
      this.$router.push('/')
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
