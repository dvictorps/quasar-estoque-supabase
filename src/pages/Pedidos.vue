<template>
  <q-page padding>
    <q-table
      :rows="compras"
      :columns="columns"
      row-key="id"
      :loading="loading"
      >
      <template v-slot:top>
          <span class="text-h6">
              Pedidos de Compras:
          </span>
          <q-space/>
      </template>
    </q-table>
  </q-page>
</template>

<script>

import { formatCurrency } from 'src/utils/format'

const columns = [
  { name: 'nome', align: 'center', label: 'Nome do Cliente', field: 'nome', sortable: true },
  { name: 'estado', align: 'center', label: 'RG', field: 'estado', sortable: true },
  { name: 'cidade', align: 'center', label: 'Cidade', field: 'cidade', sortable: true },
  { name: 'bairro', align: 'center', label: 'Bairro', field: 'bairro', sortable: true },
  { name: 'rua', align: 'center', label: 'Rua', field: 'rua', sortable: true },
  { name: 'numero', align: 'center', label: 'Número da casa', field: 'numero', sortable: true },
  { name: 'data', align: 'center', label: 'Data da Compra', field: 'data', sortable: true },
  { name: 'nomeProduto', align: 'center', label: 'Produto(s)', field: 'nomeProduto', sortable: true },
  { name: 'valor', align: 'center', label: 'Valor', field: 'valor', format: (val) => formatCurrency(val), sortable: true }
]

import { defineComponent, onMounted, ref } from 'vue'
import useNotify from 'src/Composables/UseNotify'
import apiUsuario from 'src/bff/ApiUsuarios'
import userAuthUser from 'src/Composables/userAuthUser'

export default defineComponent({
  name: 'pedidos',
  setup () {
    const { user } = userAuthUser()
    const compras = ref([])
    const loading = ref(true)
    const { listaPedidosBff } = apiUsuario()
    const { notifyError } = useNotify()
    const table = 'compras'

    const handleListCompras = async () => {
      try {
        loading.value = true
        compras.value = await listaPedidosBff(table, user.value.id)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListCompras()
    })

    return {
      columns,
      compras,
      loading
    }
  }
})
</script>
