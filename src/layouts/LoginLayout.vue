<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <img class="logo" src="../assets/unnamed.jpg" alt="teste">
          <p class="teste">Superhardware</p>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, onMounted } from 'vue'
import useApi from 'src/Composables/UseApi'
import userAuthUser from 'src/Composables/userAuthUser'

export default defineComponent({
  name: 'LoginLayout',
  setup () {
    const { getBrand } = useApi()
    const { isLoggedIn } = userAuthUser()

    onMounted(() => {
      getBrand()
    })

    return {
      isLoggedIn
    }
  }
})
</script>

<style scoped>
  .teste {
    padding-left: 150px;
    padding-top: 17px;
  }
  .logo {
    float: left;
    margin-left: 5%;
    width: 55px;
    height: 50px;
    padding-top: 10px;
  }
</style>
