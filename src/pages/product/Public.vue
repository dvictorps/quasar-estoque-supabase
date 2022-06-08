<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 text-center text-h4 text-weight-medium">
        {{ brand.name }}
        <div class="text-right">
        <q-btn v-if="login" label="Sair" color="primary" icon="person" @click="confirmar = true" class="btn-sair" />
        <q-btn v-else label="Entrar" color="primary" @click="icon = true" icon="person" class="btn-logar"/>
        <q-btn v-show="!login" label="Registrar" color="primary" @click="registrar = true" icon="person" class="btn-registrar" />
        <q-space />
        <q-btn v-show="login" label="Historico de Compras" color="primary" @click="handleGoToCompras" />
        <q-dialog v-model="icon">
          <q-card>
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Conectar-se</div>
              <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section>
                <q-form @submit.prevent="handleLogin">
                  <q-input
                    label="Email"
                    v-model="form.email"
                    :rules="[val => (val && val.length > 0) || 'Preencha o campo ']"
                    type="email"
                  />
                  <q-input
                    label="Senha"
                    v-model="form.senha"
                    :rules="[val => (val && val.length >= 6) || 'Preencha o campo ']"
                  />
                  <q-btn
                    label="Login"
                    class="full-width"
                    color="primary"
                    type="submit"
                    flat
                    v-close-popup
                  />
                </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>

        <q-dialog v-model="registrar">
          <q-card class="registrar">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Registrar-se</div>
              <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section>
                <q-form @submit.prevent="handleRegister">
                  <q-input
                    label="Email"
                    v-model="register.email"
                    :rules="[val => (val && val.length > 0) || 'Preencha o campo ']"
                    type="email"
                  />
                  <q-input
                    label="Senha"
                    v-model="register.senha"
                    :rules="[val => (val && val.length >= 6) || 'Preencha o campo ']"
                  />
                  <q-input
                    label="Nome Completo"
                    v-model="register.nome"
                    :rules="[val => (val && val.length > 0) || 'Preencha o campo ']"
                  />
                  <q-input
                    label="Estado"
                    v-model="register.estado"
                    :rules="[val => (val && val.length > 0) || 'Preencha o campo ']"
                  />
                  <q-input
                    label="Cidade"
                    v-model="register.cidade"
                    :rules="[val => (val && val.length > 0) || 'Preencha o campo ']"
                  />
                  <q-input
                    label="Rua"
                    v-model="register.rua"
                    :rules="[val => (val && val.length > 0) || 'Preencha o campo ']"
                  />
                  <q-input
                    label="Bairro"
                    v-model="register.bairro"
                    :rules="[val => (val && val.length > 0) || 'Preencha o campo ']"
                  />
                  <q-input
                    label="Número da casa"
                    v-model="register.numero"
                    :rules="[val => (val && val.length > 0) || 'Preencha o campo ']"
                  />
                  <q-btn
                    label="Registrar-se"
                    class="full-width"
                    color="primary"
                    type="submit"
                    outline
                    v-close-popup
                  />
                </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>

        <q-dialog v-model="confirmar" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <p class="text-h6">Logout ?</p>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn outline label="Cancelar" color="primary" v-close-popup />
              <q-btn outline label="Sair" color="primary" v-close-popup @click="login = false, refresh()" id="recarregar"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
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
          <div class="cart">
            <q-btn round color="primary" icon="shopping_cart" @click="btnCart()"/>
          </div>
          <q-input v-model="filter" debounce="500" outlined placeholder="Pesquisa" class="col-md-1">
            <template v-slot:append>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
          <q-select
            outlined
            label = "categoria"
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
      ref="modal-dialog"
      :id="idUser"
      :nome="nome"
      :cidade="cidade"
      :estado="estado"
      :rua="rua"
      :bairro="bairro"
      :numero="numero"
      :show="showDialogDetails"
      :product="productDetails"
      @hide-dialog="showDialogDetails = false"
    />
    <CartPage
      ref="modal-cart"
      :id="idUser"
      :nome="nome"
      :cidade="cidade"
      :estado="estado"
      :rua="rua"
      :bairro="bairro"
      :numero="numero"
      :show="showDialogDetails"
      :product="productDetails"
      :limpaCart="limparCart"
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
import { useRoute, useRouter } from 'vue-router'
import DialogProductDetails from 'components/DialogProductDetails'
import CartPage from 'components/Cart'
import apiUsuario from 'src/Composables/ApiUsuarios'
import { openURL } from 'quasar'

export default defineComponent({
  name: 'PageProductPublic',

  data: () => {
    return {
      productsCart: [],
      icon: false,
      confirmar: false,
      registrar: false
    }
  },
  methods: {
    btnCart () {
      // eslint-disable-next-line
      this.productsCart = this.$refs["modal-dialog"].cart
      // eslint-disable-next-line
      this.$refs["modal-cart"].abrirModal(this.productsCart)
    },
    limparCart () {
      // eslint-disable-next-line
      this.$refs["modal-dialog"].limparCart()
      this.productsCart = []
      console.log(this.productsCart, 2)
    }
  },
  watch: {
    lista (val) {
      this.renderComponent = false
      this.$nextTick(() => {
        this.renderComponent = true
      })
    }
  },
  components: {
    DialogProductDetails,
    CartPage
  },

  setup () {
    const form = ref({
      email: '',
      senha: ''
    })
    const register = ref({
      email: '',
      senha: '',
      rua: '',
      bairro: '',
      numero: '',
      cidade: '',
      nome: '',
      estado: ''
    })
    const nome = ref()
    const estado = ref()
    const cidade = ref()
    const bairro = ref()
    const rua = ref()
    const numero = ref()
    const idUser = ref()
    const { logar, registrar } = apiUsuario()
    const products = ref([])
    const loading = ref(true)
    const login = ref(false)
    const { listPublic, brand } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const table = 'product'
    const route = useRoute()
    const router = useRouter()
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

    const refresh = () => { location.reload() }

    const handleGoToCompras = () => {
      const link = router.resolve({ name: 'HistoricoCompras', params: { idUsuario: idUser.value } })
      openURL(window.origin + link.href)
    }

    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleRegister = async () => {
      try {
        await registrar('usuarios', register.value)
        notifySuccess('Cadastro efetuado !!')
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleListCategories = async (userId) => {
      optionsCategory.value = await listPublic('category', userId)
    }

    const handleLogin = async () => {
      try {
        const resposta = await logar('usuarios', form.value.email, form.value.senha)
        notifySuccess('usuário encontrado !!')
        login.value = true
        idUser.value = resposta[0].id
        nome.value = resposta[0].nome
        estado.value = resposta[0].estado
        cidade.value = resposta[0].cidade
        bairro.value = resposta[0].bairro
        rua.value = resposta[0].rua
        numero.value = resposta[0].numero
      } catch (error) {
        notifyError('usuário não encontrado')
      }
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
      handleScrollToTop,
      form,
      register,
      handleLogin,
      login,
      handleGoToCompras,
      idUser,
      refresh,
      handleRegister,
      nome,
      estado,
      cidade,
      bairro,
      rua,
      numero
    }
  }
})
</script>
<style>
.cart{
  padding-right: 10px;
}

.registrar {
width: 100%;
margin: 0 auto;
}

.btn-registrar {
  margin-left: 2%;
  margin-bottom: 1%;
}

.btn-logar {
  margin-bottom: 1%;
}

.btn-sair {
  margin-bottom: 1%;
}
</style>
