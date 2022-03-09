<template>
  <q-page padding>
    <q-table
      :rows="products"
      :columns="columns"
      row-key="id"
      :loading="loading"
      >
      <template v-slot:top>
          <span class="text-h6">
              Produtos
          </span>
          <q-space/>
          <q-btn
            label="Minha loja"
            class="q-mr-sm"
            icon="mdi-store"
            color="info"
            @click="handleGoToStore"
          />
          <q-btn
            label="Link da Loja"
            class="q-mr-sm"
            icon="mdi-content-copy"
            color="info"
            @click="handleCopyPublicUrl"
          />
          <q-btn label="Adicionar" color="info" icon="add" :to="{ name: 'form-product' }" />
      </template>
      <template v-slot:body-cell-img_url="props">
        <q-td :props="props">
          <q-avatar v-if="props.row.img_url" size="80px">
            <img :src="props.row.img_url" >
          </q-avatar>
          <q-avatar v-else icon="mdi-image-off" color="red" />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-sm">
          <q-btn icon="mdi-pencil" dense @click="handleEdite(props.row)">
              <q-tooltip>
                  Editar
              </q-tooltip>
          </q-btn>
          <q-btn icon="mdi-delete" color="negative" dense @click="handleRemoveProduct(props.row)">
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

import { formatCurrency } from 'src/utils/format'

const columns = [
  { name: 'name', align: 'center', label: 'Nome', field: 'name', sortable: true },
  { name: 'img_url', align: 'center', label: 'Imagem', field: 'img_url', sortable: false },
  { name: 'amount', align: 'center', label: 'Quantidade', field: 'amount', sortable: true },
  { name: 'price', align: 'center', label: 'Preço', field: 'price', format: (val) => formatCurrency(val), sortable: true },
  { name: 'actions', label: 'Ações', align: 'right', field: 'actions', sortable: false }
]

import { defineComponent, onMounted, ref } from 'vue'
import useApi from 'src/Composables/UseApi'
import useNotify from 'src/Composables/UseNotify'
import { useRouter } from 'vue-router'
import { useQuasar, openURL, copyToClipboard } from 'quasar'
import userAuthUser from 'src/Composables/userAuthUser'

export default defineComponent({
  name: 'PageProductList',
  setup () {
    const products = ref([])
    const loading = ref(true)
    const { listPublic, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const { user } = userAuthUser()
    const router = useRouter()
    const $q = useQuasar()
    const table = 'product'

    const handleListProducts = async () => {
      try {
        loading.value = true
        products.value = await listPublic(table, user.value.id)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdite = (category) => {
      router.push({ name: 'form-product', params: { id: category.id } })
    }

    const handleGoToStore = () => {
      const idUser = user.value.id
      const link = router.resolve({ name: 'product-public', params: { id: idUser } })
      openURL(window.origin + link.href)
    }

    const handleCopyPublicUrl = () => {
      const idUser = user.value.id
      const link = router.resolve({ name: 'product-public', params: { id: idUser } })
      const externalLink = window.origin + link.href
      copyToClipboard(externalLink)
        .then(() => {
          notifySuccess('Link Copiado')
        })
        .catch((error) => {
          notifyError(error.message)
        })
    }

    const handleRemoveProduct = async (category) => {
      try {
        $q.dialog({
          title: 'Deletar',
          message: `Você quer realmente deletar:  '${category.name}'`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, category.id)
          notifySuccess('Deletado com sucesso')
          handleListProducts()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListProducts()
    })

    return {
      columns,
      products,
      loading,
      handleEdite,
      handleRemoveProduct,
      handleGoToStore,
      handleCopyPublicUrl
    }
  }
})
</script>
