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
              <q-img :src="product.img_url" style="min-width:300px" />
            </q-card-section>

            <q-card-section>
              <div class="text-h6">
                {{product.name}}
                {{id}}
              </div>
              <div class="text-subtitle">
                {{ formatCurrency(product.price) }}
              </div>
              <div class="text-body2" v-html="product.description" />
            </q-card-section>

            <q-card-actions class="centro">
              <q-btn color="primary" icon="mdi-currency-usd"  @click="comprar = true"/>
              <q-btn color="red" icon="close" v-close-popup class="fechar" />
              <q-btn icon="mdi-cart-variant" color="primary" v-on:click="addItemToCart(product)" @click="validaT = true"/>
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
import apiUsuario from 'src/Composables/ApiUsuarios'
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
    }
  },
  setup (props, { emit }) {
    const { brand } = UseApi()

    const { notifyError, notifySuccess } = useNotify()

    const msg = 'Olá, me interessei no produto: '

    const { inserirCompra } = apiUsuario()

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
        await inserirCompra('compras', props.product.price, props.id, date, props.nome, props.estado, props.cidade, props.bairro, props.rua, props.numero, props.product.name)
        console.log(props.product.price)
        console.log(props.id)
        notifySuccess('Compra realizada')
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
      // eslint-disable-next-line
	    cart: [],
      teste: [],
      comprar: false,
      adicionarCarrinho: true,
      valida: false,
      validaT: false
    }
  },
  methods: {

    addItemToCart (product) {
      this.validaId()
      console.log(this.id)
      this.cart.push(product)
      // console.log(product)
      /*  this.teste = this.cart */
    },
    limparCart () {
      this.cart = []
      console.log(this.cart)
    },
    limparUnidade: function (cart) {
      this.cart.splice(cart, 1)
      console.log(this.cart)
    },
    validaId () {
      if (this.id == null) {
        console.log('testessdetezs')
        this.valida = true
      }
    }
  }
})
</script>

<style scoped>
.button-zap{
width: 30.0%;
height: 38px;
border-radius: 5px;
border: 2px solid black;
margin-left: 3%;
text-align: center;
padding: 2px;
background-color: lawngreen;
}
.button-zap img{
  width: 30px;
  height: 30px;
  position: relative;
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

.centro{
  display: flex;
  justify-content: space-between;
}
</style>
