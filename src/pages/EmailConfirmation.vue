<template>
  <q-page padding>
    <p class="text-body1">
        Obrigado por se registrar !
    </p>
    <p class="text-body1">
        Por favor, confirme seu email para finalizar o registro: <strong>{{$route.query.email}}</strong>
    </p>

  <div class="full-width q-pt-md">
    <q-btn
      label="Back"
      class="full-width"
      color="dark"
      :to = "{ name: 'login' }"
    />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageEmailConfirmation'
})
</script>
