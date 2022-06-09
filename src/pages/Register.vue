<template>
  <q-page padding>
  <q-form class="row justify-center" padding @submit.prevent="handleRegister">
          <p class="col-12 text-h5 text-center"> Registro </p>
        <div class="col-md-6 col-sm-6 col-xs-10 q-gutter-y-md">
            <q-input
              label="Nome"
              v-model="form.name"
              :rules="[val => (val && val.length > 0) || 'Preencha o campo ']"
            />

            <q-input
              label="Email"
              v-model="form.email"
              :rules="[val => (val && val.length > 0) || 'Preencha o campo ']"
              type="email"
            />

            <q-input
              label="Senha"
              v-model="form.password"
              :rules="[val => (val && val.length >= 6) || 'Preencha o campo e coloque pelo menos 6 caracteres']"
              type="password"
            />

            <div class="full-width q-pt-md">
             <q-btn
              label="Registro"
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
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageRegister',

  setup () {
    const router = useRouter()
    const { register } = userAuthUser()
    const { notifyError, notifySuccess } = useNotify()
    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const handleRegister = async () => {
      try {
        await register(form.value)
        notifySuccess('Email enviado !!')
        router.push({
          name: 'email-confirmation',
          query: { email: form.value.email }
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleRegister
    }
  }
})
</script>
