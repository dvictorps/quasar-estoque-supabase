<template>
    <q-dialog
      :model-value="show"
      @before-hide="handleClose"
    >
    <q-dialog v-model="comprar" v-if="id">
          <q-card>
            <q-card-section class="row items-center">
              <p class="text-h6">Comprar ?</p>
            </q-card-section>
            <q-card-section>
              <div class="text-h6">
                {{product.name}}
              </div>
              <br>
              <hr>
              <br>
              <div class="text-subtitle">
                {{ formatCurrency(product.price) }}
              </div>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn outline label="Sim" color="green" @click="handleCompra" v-close-popup/>
              <q-btn outline label="Não" color="red" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="comprar" v-else>
          <q-card>
            <q-card-section class="row items-center">
              <p class="text-h6">Faça login por favor</p>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn outline label="ok" color="green" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="validaT" v-if='this.valida'>
          <q-card>
            <q-card-section class="row items-center">
              <p class="text-h6">Faça login por favor</p>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn outline label="ok" color="green" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-card>
            <q-card-section>
              <div class="text-h6">Detalhes do Produto: </div>
            </q-card-section>

            <q-card-section>
              <q-img :src="product.img_url" />
            </q-card-section>

            <q-card-section>
              <div class="titulo">
                {{product.name}}
              </div>
              <div class="preco-quant">
                Valor: {{ formatCurrency(product.price) }} / Quantidade Disponível: {{product.amount}}
              </div>
              <div class="desc" v-html="product.description" />
            </q-card-section>

            <q-card-actions class="centro">
              <q-btn color="primary" icon="mdi-currency-usd"  @click="comprar = true" class="comprar"/>
              <q-btn color="red" icon="close" v-close-popup class="fechar" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { formatCurrency } from 'src/utils/format'
import useNotify from 'src/Composables/UseNotify'
import { openURL } from 'quasar'
import UseApi from 'src/Composables/UseApi'
import apiUsuario from 'src/bff/ApiUsuarios'
export default defineComponent({
  name: 'DialogProductDetails',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    product: {
      type: Object
    },
    id: {
      type: Number
    },
    nome: {
      type: String
    },
    estado: {
      type: String
    },
    cidade: {
      type: String
    },
    bairro: {
      type: String
    },
    rua: {
      type: String
    },
    numero: {
      type: String
    },
    idAdm: {
      type: Number
    }
  },
  setup (props, { emit }) {
    const { brand } = UseApi()

    const { notifyError, notifySuccess } = useNotify()

    const msg = 'Olá, me interessei no produto: '

    const { inserirCompraBff, atualizaProdutoBff } = apiUsuario()

    const handleClose = () => {
      emit('hideDialog')
    }

    const data = new Date()
    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const ano = String(data.getFullYear())
    const hora = String(data.getHours()).padStart(2, '0')
    const min = String(data.getMinutes()).padStart(2, '0')
    const sec = String(data.getSeconds()).padStart(2, '0')

    const date = `Compra realizada em ${dia}/${mes}/${ano}, aproximadamente as ${hora}:${min}:${sec}`

    const handleCompra = async () => {
      console.log(props.estado)
      try {
        if (props.product.amount !== 0) {
          await inserirCompraBff('compras', props.product.price, props.id, date, props.nome, props.estado, props.cidade, props.bairro, props.rua, props.numero, props.product.name, props.idAdm)
          await atualizaProdutoBff('product', props.product.id, props.product.amount)
          notifySuccess('Compra realizada')
        } else {
          notifyError('Quantidade indisponível')
        }
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleSendWpp = () => {
      const link = encodeURI(`https://api.whatsapp.com/send?phone=55${brand.value.phone}&text=${msg} - ${props.product.name} - no valor de ${formatCurrency(props.product.price)}`)
      openURL(link)
    }
    return {
      formatCurrency,
      handleClose,
      handleSendWpp,
      handleCompra
    }
  },
  data: function () {
    return {
      comprar: false,
      adicionarCarrinho: true,
      valida: false,
      validaT: false
    }
  }
})
</script>

<style scoped>
.desc{
  border: 1px solid black;
  padding: 10px;
  border-radius: 5%;
}
.fechar{
width: 30.0%;
height: 38px;
border-radius: 5px;
border: 2px solid black;
margin-left: 1%;
text-align: center;
padding: 2px;
background-color: purple;
}

.titulo {
  width: 100%;
  font-size: 36px;
  padding: 20px;
  text-align: center;
}

.comprar{
width: 30.0%;
height: 38px;
border-radius: 5px;
border: 2px solid black;
margin-left: 1%;
text-align: center;
padding: 2px;
background-color: purple;
}

.preco-quant{
  margin: 0 auto;
  text-align: center;
  font-size: 20px;
  padding: 10px;
  background-color: rgba(10, 252, 34, 0.5);
  margin-bottom: 5px;
  font-weight: bold;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

.centro{
  display: flex;
  justify-content: space-between;
}
</style>
