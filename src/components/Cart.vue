<template>
<q-dialog v-model="modalAtivo" width="700px"
    hide-overlay
    persistent
    no-click-animation >
    <q-card style=" width: 60vh;">
      <q-card-section v-if="this.cart.length == 0">
        <div class="text-h6 centro">Carrinho vazio</div>
      </q-card-section>

      <q-card-section style="max-height: 60vh;" class="scroll">
      <!--<p>{{this.cart}}</p>-->
      <div v-for="product in cart" :key="product.name" >
        <div class='produto'>
          <img class="img" :src="product.img_url"/>
          <div class="space">
            <p class="space">{{product.name}}</p>
            <p class="space">{{ formatCurrency(product.price) }}</p>
            <div class="local">
              <q-btn flat class="space espaco" color="red" icon="delete" @click="this.limpaUnidade(this.cart)" />
            </div>
          </div>
        </div>
      </div>

      </q-card-section>
      <div class="valor">
        <p class="valorFinal">Preço final: {{formatCurrency(this.valorFinal)}}</p>
      </div>

      <q-card-actions align="center">
        <q-btn v-if="this.cart.length != 0" @click="this.limpaCart" v-close-popup  icon="mdi-delete-forever" color="red-7" />
        <q-btn v-if="this.cart.length != 0" @click="handleCompra()" v-close-popup  icon="mdi-currency-usd" color="pink-7" />
        <q-btn @click="fecharModal()" v-close-popup  icon="mdi-close" color="red-5" />
      </q-card-actions>
    </q-card>
    </q-dialog>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { formatCurrency } from 'src/utils/format'
import apiUsuario from 'src/bff/ApiUsuarios'
const columns = [
  { format: (val) => formatCurrency(val), sortable: true }
]

export default defineComponent({

  name: 'CartPage',

  data: () => ({
    modalAtivo: false,
    cart: [],
    nomesProductCart: '',
    valorFinal: 0,
    teste2: []
  }),

  props: {
    product: {
      type: Array,
      required: true
    },
    show: {
      type: Boolean,
      required: true
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
    limpaCart: {
      type: Function
    },
    limpaUnidade: {
      type: Function
    }
  },
  methods: {
    abrirModal (param) {
      this.cart = []
      this.modalAtivo = true
      console.log(param, 3)//
      for (let i = 0; i < param.length; i++) {
        this.cart.push(param[i])
      }
      this.somarValorFinal()
      this.nomeProductCart()
    },
    fecharModal () {
      this.modalAtivo = false
      this.cart = []
      this.nomesProductCart = ''
    },
    salvar () {
      this.modalAtivo = false
      this.teste2 = this.cart
    },
    deleteItem: function (cart) {
      this.cart.splice(cart, 1)
      this.nomesProductCart = ''
    },
    somarValorFinal () {
      this.valorFinal = 0
      // console.log(this.cart[0].price, 'normal teste')
      if (this.valorFinal == null) {
        // console.log('teste')
        return 0
      } else {
        for (let i = 0; i < this.cart.length; i++) {
          this.valorFinal += this.cart[i].price
          // console.log(this.valorFinal)
        }
        return this.valorFinal
      }
    },
    nomeProductCart () {
      if (this.valorFinal == null) {
        // console.log('teste')
        return 0
      } else {
        for (let i = 0; i < this.cart.length; i++) {
          this.nomesProductCart += this.cart[i].name + ', '
        }
        console.log(this.nomesProductCart)
        return this.nomesProductCart
      }
    },

    async handleCompra () {
      const { inserirCompraBff } = apiUsuario()
      const data = new Date()
      const dia = String(data.getDate()).padStart(2, '0')
      const mes = String(data.getMonth() + 1).padStart(2, '0')
      const ano = String(data.getFullYear())
      const hora = String(data.getHours()).padStart(2, '0')
      const min = String(data.getMinutes()).padStart(2, '0')
      const sec = String(data.getSeconds()).padStart(2, '0')

      const date = `Compra realizada em ${dia}/${mes}/${ano}, aproximadamente as ${hora}:${min}:${sec}`
      console.log(this.estado)
      try {
        await inserirCompraBff('compras', this.valorFinal, this.id, date, this.nome, this.estado, this.cidade, this.bairro, this.rua, this.numero, this.nomeProductCart())
        alert('Compra realizada')
      } catch (error) {
        console.log(error)
      }
    }
  },

  mounted () {
  },

  setup (props, { emit }) {
    return {
      columns,
      formatCurrency,
      basic: ref(false),
      fixed: ref(false)
    }
  }
})
</script>

<style scoped>
.valorFinal {
  font-size: 18px;
  text-align: center;
  padding: 10px;
}
.valor {
  border-radius: 12px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  weight: 110px;
}
.produto{
  display: grid;
  grid-template-columns: auto auto auto;
  padding-bottom: 20px;
}
.img{
  border-radius: 12px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  height: 110px;
  weight: 110px;
}
.nome{
margin-right: 200;
}
.centro{
  text-align: center;
}
.space{
  display: flex;
  justify-content: space-between;
  padding-top:20px;
}
.espaco{
  margin: 0px;
  padding: 0px;
  margin-bottom: 50px;
}

.local{
  padding-top:10px;
  float: right;
}
</style>
