<template>
  <q-page padding>
      <q-form class="row justify-center" @submit.prevent="handleLogin">
          <p class="col-12 text-h5 text-center"> Login </p>
        <div class="col-md-6 col-sm-6 col-xs-10 q-gutter-y-md">
            <q-input
              label="Email"
              v-model="form.email"
              :rules="[val => (val && val.length > 0) || 'Preencha o campo ']"
              type="email"
            />

            <q-input
              label="Senha"
              v-model="form.password"
              :rules="[val => (val && val.length >= 6) || 'Preencha o campo ']"
            />

            <div class="full-width q-pt-md">
             <q-btn
              label="Login"
              class="full-width"
              color="primary"
              type="submit"
              flat
             />
            </div>

            <div class="full-width q-pt-md">
             <q-btn
              label="Registrar-se"
              class="full-width"
              outline
              color="primary"
              type="submit"
              to="/register"
             />
            </div>

            <div class="full-width q-pt-md">
             <q-btn
              label="Esqueceu a senha ?"
              class="full-width"
              color="primary"
              type="submit"
              to="/forgot-password"
             />
            </div>
        </div>
      </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import userAuthUser from 'src/Composables/userAuthUser'
import useNotify from 'src/Composables/UseNotify'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageLogin',

  setup () {
    const router = useRouter()

    const { login, isLoggedIn } = userAuthUser()

    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      email: '',
      password: ''
    })

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'me' })
      }
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        notifySuccess('Bem vindo !!')
        router.push({ name: 'me' })
      } catch (error) {
        notifyError('Você deve colocar um email e senha válidos !!')
      }
    }

    return {
      form,
      handleLogin
    }
  }
})
</script>
