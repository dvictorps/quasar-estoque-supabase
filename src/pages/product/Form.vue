<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">
                Formulário de Produtos
                </p>
            </div>
        <q-form class="col-md-6 col-sm-6 col-xs-10 q-gutter-y-md" @submit.prevent="handleSubmit">
            <q-input
              label="Nome"
              v-model="form.name"
              :rules="[val => (val && val.length > 0) || 'Preencha o campo ']"
            />

            <q-input
              label="Quantidade"
              v-model="form.amount"
              :rules="[val => !!val || 'Preencha o campo ']"
              type="number"
            />

            <q-input
              label="Preço"
              v-model="form.price"
              :rules="[val => !!val || 'Preencha o campo ']"
              type="number"
              prefix="R$"
            />

            <q-input
              label="Imagem"
              v-model="img"
              type="file"
              stack-label
              accept="image/*"
            />

            <q-editor
              v-model="form.description"
              min-height="5rem"
            />

            <q-select
              v-model="form.category_id"
              :options="optionsCategory"
              label="Categoria"
              option-value="id"
              option-label="name"
              map-options
              emit-value
              :rules="[val => !!val || 'Preencha o campo ']"
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
              :to="{ name: 'product' }"
              class="full-width"
            />
        </q-form>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import userAuthUser from 'src/Composables/userAuthUser'
import useNotify from 'src/Composables/UseNotify'
import useApi from 'src/Composables/UseApi'

export default defineComponent({
  name: 'PageFormCategory',
  setup () {
    const table = 'product'
    const router = useRouter()
    const route = useRoute()
    const optionsCategory = ref([])
    const { post, getById, update, listPublic, uploadImg } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const isUpdate = computed(() => route.params.id)
    const { user } = userAuthUser()
    let product = {}
    const form = ref({
      name: '',
      description: '',
      amount: 0,
      price: 0,
      category_id: '',
      img_url: ''
    })
    const img = ref([])

    const handleSubmit = async () => {
      try {
        if (img.value.length > 0) {
          const imgUrl = await uploadImg(img.value[0], 'products')
          form.value.img_url = imgUrl
        }
        if (isUpdate.value) {
          console.log(form.value)
          await update(table, form.value)
          notifySuccess('Atualizado com sucesso')
        } else {
          await post(table, form.value)
          notifySuccess('Salvo com sucesso')
        }
        router.push({ name: 'product' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListCategories()
      if (isUpdate.value) {
        handleGetProduct(isUpdate.value)
      }
    })

    const handleListCategories = async () => {
      optionsCategory.value = await listPublic('category', user.value.id)
    }

    const handleGetProduct = async (id) => {
      try {
        product = await getById(table, id)
        form.value = product
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      handleSubmit,
      form,
      isUpdate,
      optionsCategory,
      img
    }
  }
})
</script>
