<template>
  <div
    class="min-h-full w-full max-w-5xl flex flex-col justify-center items-center"
  >
    <h3 class="text-4xl">Welcome, {{ $auth.user.username }}</h3>

    <div class="text-center" v-if="bottles.length === 0">
      <p class="mb-6">You haven't set up a device yet.</p>
      <app-button-link to="/device/setup">
        Set up a device
      </app-button-link>
    </div>

    <div v-else class="h-full w-full mt-12">
      <h1 class="text-3xl mb-4">My bottles</h1>

      <ul class="flex flex-wrap">
        <li v-for="bottle in bottles" :key="bottle.id" class="w-1/3">
          <nuxt-link :to="`/device/${bottle.id}`">
            <app-card>
              <app-card-content>
                <div class="flex">
                  <img src="~/static/logo.svg" alt="" class="h-12 mr-4" />
                  <header>
                    <h3 class="font-bold">{{ bottle.name }}</h3>
                    <h4 class="text-small">{{ bottle.code }}</h4>
                  </header>
                </div>
              </app-card-content>
            </app-card>
          </nuxt-link>
        </li>
      </ul>
    </div>

    <app-modal
      :show="modal.show"
      :header="modal.header"
      :body="modal.body"
      @close="toggleModal(false)"
      @success="toggleModal(false)"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { BottleView } from '../models/Bottle'
import { connect, watch } from '../plugins/bluetooth'

@Component({
  components: {
    AppModal: () => import('~/components/modal/modal.vue'),
    AppButton: () => import('~/components/button/button.vue'),
    AppButtonLink: () => import('~/components/button/button-link.vue'),
    AppCard: () => import('~/components/card/card.vue'),
    AppCardContent: () => import('~/components/card/card-content.vue'),
    AppLabelledCheckbox: () =>
      import('~/components/form/labelled-checkbox.vue'),
    AppInput: () => import('~/components/form/input.vue'),
  },
})
export default class PageIndex extends Vue {
  modal = {
    show: false,
    header: 'No bluetooth module detected.',
    // prettier-ignore
    body:
      'The device you\'re using does not have bluetooth capabilities. Please use another device.'
  }

  @Getter('bottles/bottles') bottles: () => BottleView[]

  @Action('bottles/fetchMyBottles') fetchBottles: (
    options?: any,
  ) => Promise<BottleView[]>

  mounted() {
    this.fetchBottles().then(bottles =>
      bottles.forEach(async bottle => {
        const server = await connect(bottle.code)
        watch(0x181d, 0x2a98, e => {
          alert(e.target.value.getUInt8(0) / 100)
        })
      }),
    )

    if (!('bluetooth' in navigator)) {
      this.toggleModal(true)
    }
  }

  toggleModal(state = null) {
    this.modal.show = state === null ? !this.modal.show : state
  }
}
</script>
