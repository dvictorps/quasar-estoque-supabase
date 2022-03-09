<template>
  <q-page padding>
  <q-form class="row justify-center" padding @submit.prevent="handlePasswordReset">
          <p class="col-12 text-h5 text-center"> Digite abaixo a nova senha </p>
        <div class="col-md-6 col-sm-6 col-xs-10 q-gutter-y-md">

            <q-input
              label="New password"
              v-model="password"
            />

            <div class="full-width q-pt-md">
             <q-btn
              label="Trocar senha"
              class="full-width"
              color="primary"
              type="submit"
              outline
             />
            </div>

        </div>
      </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import userAuthUser from 'src/Composables/userAuthUser'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'PageResetPassword',
  setup () {
    const { resetPassword } = userAuthUser()
    const route = useRoute()
    const router = useRouter()
    const token = route.query.token
    const password = ref('')

    const handlePasswordReset = async () => {
      await resetPassword(token, password.value)
      router.push({ name: 'login' })
    }

    return {
      handlePasswordReset,
      password
    }
  }
})

</script>
