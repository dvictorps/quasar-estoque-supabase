<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">
                Formulário de categoria
                </p>
            </div>
        <q-form class="col-md-6 col-sm-6 col-xs-10 q-gutter-y-md" @submit.prevent="handleSubmit">
            <q-input
              label="Nome"
              v-model="form.name"
              :rules="[val => (val && val.length > 0) || 'Preencha o campo ']"
            />

            <q-btn
              :label="isUpdate ? 'Atualizar' : 'Salvar'"
              color="primary"
              rounded
              type="submit"
              class="full-width"
            />

            <q-btn
              label="Voltar"
              color="dark"
              flat
              :to="{ name: 'category' }"
              class="full-width"
            />
        </q-form>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useNotify from 'src/Composables/UseNotify'
import useApi from 'src/Composables/UseApi'

export default defineComponent({
  name: 'PageFormCategory',
  setup () {
    const table = 'category'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const isUpdate = computed(() => route.params.id)
    let category = {}
    const form = ref({
      name: ''
    })

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          console.log(form.value)
          await update(table, form.value)
          notifySuccess('Atualizado com sucesso')
        } else {
          await post(table, form.value)
          notifySuccess('Salvo com sucesso')
        }
        router.push({ name: 'category' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      if (isUpdate.value) {
        handleGetCategory(isUpdate.value)
      }
    })

    const handleGetCategory = async (id) => {
      try {
        category = await getById(table, id)
        form.value = category
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      handleSubmit,
      form,
      isUpdate
    }
  }
})
</script>
