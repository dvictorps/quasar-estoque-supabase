<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 text-center text-h4 text-weight-medium">
        {{ brand.name }}
      </div>
    </div>
    <q-table
      :rows="products"
      :columns="columns"
      row-key="id"
      :loading="loading"
      grid
      :filter="filter"
      v-model:pagination="initialPagination"
      hide-pagination
      >
      <template v-slot:top>
          <span class="text-h6">
              Produtos
          </span>
          <q-space/>
          <q-input v-model="filter" debounce="500" outlined placeholder="Pesquisar">
            <template v-slot:append>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
          <q-select
            outlined
            label = "cateogory"
            :options = "optionsCategory"
            v-model = "categoryId"
            option-label="name"
            option-value="id"
            class="col-md-2 q-ml-sm"
            map-options
            emit-value
            clearable
            @update:model-value="handleListProducts(route.params.id)"
          />
      </template>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card class="cursor-pointer" v-ripple:primary @click="handleShowDetails(props.row)">
            <q-img img :src="props.row.img_url" />
            <q-card-section class="text-center">
              <div class="text-h6">{{ props.row.name }}</div>
              <div class="text-subtitle">{{ formatCurrency(props.row.price) }}</div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
    <div class="row justify-center">
      <q-pagination
          :max="pagesNumber"
          direction-links
          v-model="initialPagination"
          @update:model-value="handleScrollToTop"
       />
    </div>
    <DialogProductDetails
      :show="showDialogDetails"
      :product="productDetails"
      @hide-dialog="showDialogDetails = false"
    />
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

import { defineComponent, onMounted, ref, computed } from 'vue'
import useApi from 'src/Composables/UseApi'
import useNotify from 'src/Composables/UseNotify'
import { useRoute } from 'vue-router'
import DialogProductDetails from 'components/DialogProductDetails'

export default defineComponent({
  name: 'PageProductPublic',
  components: {
    DialogProductDetails
  },
  setup () {
    const products = ref([])
    const loading = ref(true)
    const { listPublic, brand } = useApi()
    const { notifyError } = useNotify()
    const table = 'product'
    const route = useRoute()
    const filter = ref('')
    const showDialogDetails = ref(false)
    const productDetails = ref({})
    const optionsCategory = ref([])
    const categoryId = ref('')
    const initialPagination = ref({
      page: 1,
      rowPerPage: 5
    })

    const handleListProducts = async (userId) => {
      try {
        loading.value = true
        products.value = categoryId.value ? await listPublic(table, userId, 'category_id', categoryId.value) : await listPublic(table, userId)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleListCategories = async (userId) => {
      optionsCategory.value = await listPublic('category', userId)
    }

    onMounted(() => {
      if (route.params.id) {
        handleListCategories(route.params.id)
        handleListProducts(route.params.id)
      }
    })

    const handleShowDetails = (products) => {
      productDetails.value = products
      showDialogDetails.value = true
    }

    return {
      columns,
      products,
      loading,
      formatCurrency,
      filter,
      showDialogDetails,
      productDetails,
      handleShowDetails,
      brand,
      optionsCategory,
      categoryId,
      handleListProducts,
      route,
      initialPagination,
      pagesNumber: computed(() => Math.ceil(products.value.length / initialPagination.value.rowPerPage)),
      handleScrollToTop
    }
  }
})
</script>
