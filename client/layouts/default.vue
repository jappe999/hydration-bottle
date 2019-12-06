<template>
  <div
    class="h-screen w-full flex justify-center items-center bg-gray-900 font-default text-gray-100 overflow-y-auto"
  >
    <app-splash-screen v-if="loading" @loaded="loaded" />

    <template v-else>
      <transition name="menu">
        <div
          v-if="$auth.loggedIn && menuOpen"
          @click.self="toggleMenu(false)"
          class="menu-wrapper h-screen w-full fixed left-0 top-0 z-50"
        >
          <div
            class="menu h-full w-full max-w-sm justify-between bg-gray-800 p-4"
          >
            <div
              class="h-full w-full flex flex-col justify-between items-center mr-8 p-4 text-center overflow-y-auto"
            >
              <div class="w-full">
                <app-button
                  @click.native="toggleMenu(false)"
                  class="-mt-4 -ml-4 mb-8 py-6 shadow-none rounded-xl"
                  bg="gray-800"
                  bg-hover="gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    class="h-4 fill-current"
                  >
                    <path
                      d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
                    />
                  </svg>
                </app-button>

                <div class="flex flex-col items-center">
                  <img src="~/static/icon.png" class="w-24" alt="Logo" />
                  <h2 class="mt-4 text-3xl text-white font-bold">
                    Hydration Bottle
                  </h2>
                </div>
              </div>

              <div class="w-full">
                <p>Some project info.</p>
              </div>

              <div class="w-full mt-8">
                <app-button
                  v-if="$auth.loggedIn"
                  @click.native="logout"
                  class="w-full"
                >
                  Logout
                </app-button>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <div class="h-full w-full flex flex-col justify-start">
        <div v-if="$auth.loggedIn" class="flex justify-center items-start p-4">
          <div class="w-2/3">
            <app-button
              @click.native="toggleMenu(null, 1)"
              class="py-6"
              bg="gray-800"
              bg-hover="gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="h-4 fill-current"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </app-button>
          </div>

          <div class="w-2/3 flex justify-end items-center p-4">
            <div class="h-8 w-8 rounded-full object-cover overflow-hidden">
              <img src="https://source.unsplash.com/random/200x200" />
            </div>
            <span class="ml-4 mr-1">
              {{ $auth.user.username }}
            </span>
          </div>
        </div>

        <div
          class="h-full max-h-full w-full relative flex flex-col items-center pt-0 lg:pt-0 p-4 overflow-y-auto overflow-x-hidden text-gray-100"
        >
          <transition name="page">
            <nuxt />
          </transition>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    AppSplashScreen: () => import('~/components/page/splash-screen.vue'),
    AppCard: () => import('~/components/card/card.vue'),
    AppButton: () => import('~/components/button/button.vue'),
    AppLink: () => import('~/components/link.vue'),
  },
})
export default class DefaultLayout extends Vue {
  $auth

  menuOpen: boolean = false
  loading: boolean = true

  loaded() {
    this.$router.replace(this.$route.path)
    this.loading = false
  }

  toggleMenu(state: boolean = null, timeout = 0) {
    setTimeout(() => {
      this.menuOpen = state === null ? !this.menuOpen : state
    }, timeout)
  }

  logout() {
    this.$auth.logout()
    this.$router.push('/game')
  }
}
</script>

<style scoped>
.menu-enter-active,
.menu-enter-active > div,
.menu-leave-active,
.menu-leave-active > div {
  transition: all 0.2s;
}

.menu-enter,
.menu-leave-active {
  opacity: 0;
}

.menu-enter > div {
  transform: translateX(calc(-100% - 2rem));
}

.menu-leave-active > div {
  transform: translateX(calc(-100% - 2rem));
}

.menu-wrapper {
  background-color: rgba(26, 32, 44, 0.75);
}
</style>
