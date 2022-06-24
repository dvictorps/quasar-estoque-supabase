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
              Histórico de Compras:
          </span>
          <q-space/>
      </template>
    </q-table>
  </q-page>
</template>

<script>

import { formatCurrency } from 'src/utils/format'

const columns = [
  { name: 'data', align: 'center', label: 'Data da Compra', field: 'data', sortable: true },
  { name: 'valor', align: 'center', label: 'Valor', field: 'valor', format: (val) => formatCurrency(val), sortable: true },
  { name: 'nomeProduto', align: 'center', label: 'Produto(s)', field: 'nomeProduto', format: (val) => formatCurrency(val), sortable: true }
]

import { defineComponent, onMounted, ref } from 'vue'
import useNotify from 'src/Composables/UseNotify'
import apiUsuario from 'src/bff/ApiUsuarios'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'HistoricoCompras',
  setup () {
    const compras = ref([])
    const loading = ref(true)
    const { listaComprasBff } = apiUsuario()
    const { notifyError } = useNotify()
    const table = 'compras'
    const route = useRoute()

    const handleListCompras = async (usuarioId) => {
      try {
        loading.value = true
        compras.value = await listaComprasBff(table, usuarioId)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      if (route.params.idUsuario) {
        handleListCompras(route.params.idUsuario)
      }
    })

    return {
      columns,
      compras,
      loading
    }
  }
})
</script>
