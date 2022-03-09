<template>
    <q-dialog
      :model-value="show"
      @before-hide="handleClose"
    >
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
              </div>
              <div class="text-subtitle">
                {{ formatCurrency(product.price) }}
              </div>
              <div class="text-body2" v-html="product.description" />
            </q-card-section>

            <q-card-actions>
              <q-btn label="Cancel" color="primary" v-close-popup />
              <q-btn label="Fazer Pedido" icon="mdi-whatsapp" color="green-7" @click="handleSendWpp" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { formatCurrency } from 'src/utils/format'
import { openURL } from 'quasar'
import UseApi from 'src/Composables/UseApi'
export default defineComponent({
  name: 'DialogProductDetails',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    product: {
      type: Object
    }
  },
  setup (props, { emit }) {
    const { brand } = UseApi()
    const msg = 'Olá, me interessei no produto: '
    const handleClose = () => {
      emit('hideDialog')
    }

    const handleSendWpp = () => {
      const link = encodeURI(`https://api.whatsapp.com/send?phone=55${brand.value.phone}&text=${msg} - ${props.product.name} - no valor de ${formatCurrency(props.product.price)}`)
      openURL(link)
    }
    return {
      formatCurrency,
      handleClose,
      handleSendWpp
    }
  }
})
</script>
