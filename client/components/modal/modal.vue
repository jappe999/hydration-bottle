<template>
  <transition name="modal">
    <div
      v-if="show"
      class="wrapper h-full w-full fixed top-0 flex justify-center items-center z-50"
    >
      <app-card
        v-if="show"
        v-click-outside="close"
        class="w-full max-w-lg flex flex-col overflow-hidden"
      >
        <app-card-content class="flex items-center justify-between">
          <slot name="header">
            <h2 class="text-2xl font-bold">
              {{ header }}
            </h2>
          </slot>

          <button @click="close" class="group cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="h-5 fill-current text-gray-800 hover:text-gray-900"
            >
              <path
                class="group-hover:hidden"
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z"
              />
              <path
                class="hidden group-hover:block"
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z"
              />
            </svg>
          </button>
        </app-card-content>

        <app-card-content>
          <slot name="body">
            <p>{{ body }}</p>
          </slot>
        </app-card-content>

        <app-card-content>
          <div class="flex justify-end">
            <app-button v-if="cancel" @click.native="close">
              {{ cancelText }}
            </app-button>
            <app-button v-if="successText" @click.native="success" class="ml-2">
              {{ successText }}
            </app-button>
          </div>
        </app-card-content>
      </app-card>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component({
  components: {
    AppCard: () => import('~/components/card/card.vue'),
    AppCardContent: () => import('~/components/card/card-content.vue'),
    AppButton: () => import('~/components/button/button.vue'),
  },
})
export default class AppModal extends Vue {
  isOpen: boolean = false

  @Prop({ default: false, type: Boolean }) show!: boolean
  @Prop(String) header!: string
  @Prop(String) body!: string
  @Prop(String) cancelText!: string
  @Prop({ default: 'OK', type: String }) successText!: string

  @Emit('close')
  close() {
    return false
  }

  @Emit('success')
  success() {
    return true
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-enter-active > div,
.modal-leave-active,
.modal-leave-active > div {
  transition: all 0.2s;
}

.modal-enter,
.modal-leave-active {
  opacity: 0;
}

.modal-enter > div {
  transform: translateY(-30px);
}

.modal-leave-active > div {
  transform: translateY(-30px);
}

.wrapper {
  background-color: rgba(26, 32, 44, 0.75);
}
</style>
