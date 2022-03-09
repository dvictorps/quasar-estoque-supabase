<template>
  <q-page padding>
  <q-form class="row justify-center" padding @submit.prevent="handleForgotPassword">
          <p class="col-12 text-h5 text-center"> Esqueceu a senha ? </p>
        <div class="col-md-6 col-sm-6 col-xs-10 q-gutter-y-md">

            <q-input
              label="Email"
              v-model="email"
              :rules="[val => (val && val.length >= 0) || 'Preencha o campo ']"
              type="email"
            />

            <div class="full-width q-pt-md">
             <q-btn
              label="Requisitar nova senha"
              class="full-width"
              color="primary"
              type="submit"
              outline
             />
            </div>

            <div class="full-width q-pt-md">
             <q-btn
              label="Back"
              class="full-width"
              color="dark"
              :to = "{ name: 'login' }"
             />
            </div>

        </div>
      </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import userAuthUser from 'src/Composables/userAuthUser'
import useNotify from 'src/Composables/UseNotify'

export default defineComponent({
  setup () {
    const { sendPasswordRestEmail } = userAuthUser()
    const email = ref('')
    const { notifyError, notifySuccess } = useNotify()

    const handleForgotPassword = async () => {
      try {
        await sendPasswordRestEmail(email.value)
        notifySuccess(`email enviado para ${email.value}`)
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      handleForgotPassword,
      email
    }
  }
})

</script>
