<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 text-center titulo">
        {{ brand.name }}
        <div class="text-right icones">
        <q-btn v-if="login" label="Sair" color="primary" icon="person" @click="confirmar = true" class="btn-sair" />
        <q-btn v-else label="Entrar" color="primary" @click="icon = true" icon="person" class="btn-logar"/>
        <q-btn v-show="!login" label="Registrar" color="primary" @click="registrar = true" icon="person" class="btn-registrar" />
        <q-btn v-show="login" label="Historico de Compras" color="primary" @click="handleGoToCompras" class="historico"/>
        <q-space />
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
                    type="password"
                  />
                  <q-btn
                    label="Login"
                    class="full-width"
                    color="primary"
                    type="submit"
                    flat
                    v-close-popup
                  />
                  <q-btn
                    label="Esqueci a Senha"
                    class="full-width"
                    color="primary"
                    fill
                    @click="resetarSenha = true"
                    v-close-popup
                  />
                </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>

        <q-dialog v-model="resetarSenha">
          <q-card>
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Nova Senha</div>
              <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section>
                <q-form @submit.prevent="handleAtualizaSenha">
                  <q-input
                    label="Email"
                    v-model="reset.email"
                    :rules="[val => (val && val.length > 0) || 'Preencha o campo ']"
                    type="email"
                  />
                  <q-input
                    label="Palavra Chave"
                    v-model="reset.palavraChave"
                    :rules="[val => (val && val.length > 0) || 'Preencha o campo ']"
                  />
                  <q-input
                    label="Nova Senha"
                    v-model="reset.novaSenha"
                    :rules="[val => (val && val.length >= 6) || 'Preencha o campo ']"
                    type="password"
                  />
                  <q-btn
                    label="Alterar"
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
                    label="Senha (min 6 caractéres)"
                    v-model="register.senha"
                    :rules="[val => (val && val.length >= 6) || 'Preencha o campo ']"
                    type="password"
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
                  <q-input
                    label="Palavra Chave para recuperar senha (números ou letras)"
                    v-model="register.palavraChave"
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
      >
      <template v-slot:top>
          <q-input v-model="filter" debounce="500" outlined placeholder="Pesquisa" class="pesquisa">
            <template v-slot:append>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
          <q-space/>
          <q-select
            outlined
            label = "categoria"
            :options = "optionsCategory"
            v-model = "categoryId"
            option-label="name"
            option-value="id"
            class="categoria"
            map-options
            emit-value
            clearable
            @update:model-value="handleListProducts(route.params.id)"
          />
      </template>
    <template v-slot:item="props">
      <div class="linha">
        <div class="produto">
            <div class="q-pa-md">

          <q-card class="my-card" v-ripple:primary @click="handleShowDetails(props.row)">
            <q-img :src="props.row.img_url" class="img">
              <div class="absolute-bottom text-h6">
                {{ props.row.name }}
              </div>
            </q-img>
            <q-card-section>
            <div class="text-subtitle2">{{ formatCurrency(props.row.price) }}</div>
            </q-card-section>
          </q-card>
          </div>
        </div>
      </div>
      </template>
    </q-table>
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
      :idAdm="idAdm"
      @hide-dialog="showDialogDetails = false, handleListProducts(route.params.id)"
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
import apiUsuario from 'src/bff/ApiUsuarios'
import { openURL } from 'quasar'

export default defineComponent({
  name: 'PageProductPublic',

  data: () => {
    return {
      icon: false,
      confirmar: false,
      registrar: false,
      resetarSenha: false
    }
  },
  components: {
    DialogProductDetails
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
      estado: '',
      palavraChave: ''
    })
    const reset = ref({
      email: '',
      novaSenha: '',
      palavraChave: ''
    })
    const nome = ref()
    const estado = ref()
    const cidade = ref()
    const bairro = ref()
    const rua = ref()
    const numero = ref()
    const idUser = ref()
    const { logarBff, registrarbff, atualizaSenhaBff } = apiUsuario()
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
    const idAdm = route.params.id
    const initialPagination = ref({
      page: 1,
      rowsPerPage: 6
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
        await registrarbff('usuarios', register.value)
        notifySuccess('Cadastro efetuado !!')
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleAtualizaSenha = async () => {
      try {
        await atualizaSenhaBff('usuarios', reset.value.palavraChave, reset.value.email, reset.value.novaSenha)
        notifySuccess('Senha Alterada !!')
      } catch (error) {
        notifyError('Falha ao atualizar')
      }
    }

    const handleListCategories = async (userId) => {
      optionsCategory.value = await listPublic('category', userId)
    }

    const handleLogin = async () => {
      try {
        const resposta = await logarBff('usuarios', form.value.email, form.value.senha)
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
      numero,
      idAdm,
      reset,
      handleAtualizaSenha
    }
  }
})
</script>
<style scoped>
.cart{
  padding-right: 10px;
}

.registrar {
width: 100%;
margin: 0 auto;
}

.btn-registrar {
  margin-left: 2%;
}

.historico{
  margin-left: 2%;
}

.titulo{
  font-size: 45px;
  font-weight: bold;
  font-style: italic;
  margin-bottom: 3%;
}

.my-card{
  border: 1px solid black;
  padding: 10px;
}

.linha{
  width: 33.3%;
  padding: 5px;
}

.categoria{
  min-width: 300px;
}

.pesquisa{
  min-width: 300px;
}

.img{
  min-height: 400px; max-width: 450px; display: block; margin: 0 auto;max-width: 400px;
}

.produto{
  width: 100%;
}

@media screen and (max-width: 1100px) {
  .linha{
  width: 50%;
  padding: 5px;
}
}

@media screen and (max-width: 1100px) {
  .pesquisa{
  width: 100%;
  margin-bottom: 2%;
  margin-top: 2%;
}
  .categoria{
    width: 100%;
    margin-bottom: 2%;
  }
}

@media screen and (max-width: 850px) {
  .linha{
  width: 100%;
  padding: 5px;
  }
}
</style>
