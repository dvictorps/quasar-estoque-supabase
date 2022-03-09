<template>
  <q-page padding>
    <q-table
      :rows="categories"
      :columns="columns"
      row-key="id"
      :loading="loading"
      >
      <template v-slot:top>
          <span class="text-h6">
              Categorias
          </span>
          <q-space/>
          <q-btn label="Adicionar" color="info" icon="add" :to="{ name: 'form-category' }" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-sm">
          <q-btn icon="mdi-pencil" dense @click="handleEdite(props.row)">
              <q-tooltip>
                  Editar
              </q-tooltip>
          </q-btn>
          <q-btn icon="mdi-delete" color="negative" dense @click="handleRemoveCategory(props.row)">
              <q-tooltip>
                  Excluir
              </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
const columns = [
  { name: 'name', align: 'center', label: 'Categoria', field: 'name', sortable: true },
  { name: 'actions', label: 'Acões', align: 'right', field: 'actions', sortable: true }
]

import { defineComponent, onMounted, ref } from 'vue'
import useApi from 'src/Composables/UseApi'
import useNotify from 'src/Composables/UseNotify'
import userAuthUser from 'src/Composables/userAuthUser'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'PageCategoryList',
  setup () {
    const categories = ref([])
    const loading = ref(true)
    const { listPublic, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const router = useRouter()
    const $q = useQuasar()
    const { user } = userAuthUser()
    const table = 'category'

    const handleListCategories = async () => {
      try {
        loading.value = true
        categories.value = await listPublic(table, user.value.id)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdite = (category) => {
      router.push({ name: 'form-category', params: { id: category.id } })
    }

    const handleRemoveCategory = async (category) => {
      try {
        $q.dialog({
          title: 'Deletar',
          message: `Você quer realmente deletar:  '${category.name}'`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, category.id)
          notifySuccess('Deletado com sucesso')
          handleListCategories()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListCategories()
    })

    return {
      columns,
      categories,
      handleListCategories,
      loading,
      handleEdite,
      handleRemoveCategory
    }
  }
})
</script>
