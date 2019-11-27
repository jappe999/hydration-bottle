<template>
  <div class="h-full w-full flex flex-wrap justify-center items-center">
    <div class="w-full max-w-sm flex flex-col justify-center items-center p-6">
      <img src="~/static/icon.png" class="w-24 mx-auto" alt="Logo" />
      <h2 class="text-3xl text-white font-bold">Hydration Bottle</h2>
    </div>

    <div class="w-full max-w-sm flex flex-col justify-center items-center">
      <app-card v-if="!$auth.loggedIn" class="w-full">
        <app-card-content>
          <h2 class="text-2xl font-bold mb-4">
            Sign in
          </h2>

          <div v-if="user.errors.any()" class="mb-4 flex flex-col">
            <div
              v-for="[field, errors] in Object.entries(user.errors.all())"
              :key="field"
              class="mb-2"
            >
              <small v-for="error in errors" :key="error">
                {{ error }}
              </small>
            </div>
          </div>

          <form @submit.prevent="signIn">
            <app-input
              v-model="user.username"
              label="Username"
              name="username"
              required
            />
            <app-input
              v-model="user.password"
              label="Password"
              name="password"
              type="password"
            />

            <div class="flex justify-end">
              <app-button :loading="user.busy" type="submit" class="font-bold">
                Sign in
              </app-button>
            </div>
          </form>
        </app-card-content>
      </app-card>

      <small class="mt-4 text-white">
        You don't have to sign up. Just pick a username and password.
      </small>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Form } from '~/plugins'
import { UserSignIn } from '~/models/User'

@Component({
  components: {
    AppCard: () => import('~/components/card/card.vue'),
    AppCardContent: () => import('~/components/card/card-content.vue'),
    AppInput: () => import('~/components/form/input.vue'),
    AppButton: () => import('~/components/button/button.vue'),
  },
})
export default class PageLogin extends Vue {
  $auth: any

  user = new Form<UserSignIn>({
    username: '',
    password: '',
  })

  async signIn() {
    this.user.startProcessing()

    try {
      await this.$auth.loginWith('local', { data: this.user.data() })
      this.$router.push('/')
    } catch ({ response }) {
      if (response.status === 401) {
        this.user.errors.set('password', response.data.message)
      }
    } finally {
      this.user.finishProcessing()
    }
  }
}
</script>
