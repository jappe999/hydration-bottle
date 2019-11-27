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
            class="px-3"
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
import { Form } from '../../plugins'

@Component({
  components: {
    AppCard: () => import('~/components/card/card.vue'),
    AppCardContent: () => import('~/components/card/card-content.vue'),
    AppInput: () => import('~/components/form/input.vue'),
    AppButton: () => import('~/components/button/button.vue'),
  },
})
export default class AppBottleConnnect extends Vue {
  $auth: any

  bottle = new Form({
    code: '',
    name: '',
  })

  async connect() {
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
