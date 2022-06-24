/* eslint-disable */
import useSupabase from 'src/boot/supabase'

import useNotify from 'src/Composables/UseNotify'

import apiUsuarios from 'src/Composables/ApiUsuarios'

const { registrar, inserirCompra, listaCompras, logar} = apiUsuarios()

export default function apiUsuario() {
  const { supabase } = useSupabase();
  const yup = require("../../src/config/yup/index");


  const registrarbff = async (table, form) => {
    console.log("chegou")
    try {

      const { email, senha, rua, bairro, numero, cidade, nome, estado } = form
      console.log("chegou", email, senha, rua, bairro, numero, cidade, nome, estado)

      const schema = yup.object().shape({
        table: yup.string().required(),
        email: yup.string().required(),
        senha: yup.string().required(),
        rua: yup.string().required(),
        bairro: yup.string().required(),
        numero: yup.string().required(),
        cidade: yup.string().required(),
        nome: yup.string().required(),
        estado: yup.string().required(),

      });


      schema.validate({ table, email, senha, rua, bairro, numero, cidade, nome, estado }, { strict: true })

        .then(async () => {
          try {
            await registrar('usuarios', form).then(
              console.log('Cadastro concluido')
            ).catch((e) => console.log(e))
          } catch (error) {
            console.log(error.message)
          }
        })
        .catch((e) => console.log(e));

    } catch (e) {

      return res.status(500).send({ error: true, message: e.message });

    }
  }
  const inserirCompraBff = async (table, valor, idUsuario, date, nome, estado, cidade, bairro, rua, numero, nomeProduto, idAdm) => {

    try {

      const schema = yup.object().shape({
        table: yup.string().required(),
        rua: yup.string().required(),
        bairro: yup.string().required(),
        numero: yup.string().required(),
        cidade: yup.string().required(),
        nome: yup.string().required(),
        estado: yup.string().required(),
        valor: yup.number().integer().required(),
        idUsuario: yup.number().integer().required(),
        date: yup.string().required(),
        nomeProduto: yup.string().required(),
        idAdm: yup.number().integer(),

      });


      schema.validate({ table, rua, bairro, numero, cidade, nome, estado, valor, idUsuario, date, nomeProduto, idAdm }, { strict: true })

        .then(async () => {
          try {
            await inserirCompra(table, valor, idUsuario, date, nome, estado, cidade, bairro, rua, numero, nomeProduto, idAdm).then(
              console.log('Cadastro concluido')
            ).catch((e) => console.log(e))
          } catch (error) {
            console.log(error.message)
          }
        })
        .catch((e) => console.log(e));

    } catch (e) {

      return console.log(e);

    }
  }
  const listaComprasBff = async (table, userId) => {
   
    try {

      const schema = yup.object().shape({
        table: yup.string().required(),
        userId: yup.string().required(),
      });


      var dados = schema.validate({ table, userId }, { strict: true })

        .then(async () => {
          try {
             var data = await listaCompras(table, userId).then(
            ).catch((e) => console.log(e))
            return data
          } catch (error) {
            console.log(error.message)
          }
        })
        .catch((e) => console.log(e));
        return dados
    } catch (e) {
      return console.log(e);
    }
  }
  const listaPedidosBff = async (table, idAdm) => { 
    try {

      const schema = yup.object().shape({
        table: yup.string().required(),
        idAdm: yup.string().required(),
      });


      var dados = schema.validate({ table, idAdm }, { strict: true })

        .then(async () => {
          try {
             var data = await listaPedidos(table, idAdm).then(
            ).catch((e) => console.log(e))
            // eslint-disable-next-line
            console.log(data,"teste")
            return data
          } catch (error) {
            console.log(error.message)
          }
        })
        .catch((e) => console.log(e));
          // eslint-disable-next-line
          console.log(dados,"2teste1")
        return dados
    } catch (e) {
      return console.log(e);
    }
  }
  const logarBff = async (table, email, senha) => {
    try {

      const schema = yup.object().shape({
        table: yup.string().required(),
        email: yup.string().required(),
        senha: yup.string().required(),
      });


      var dados = schema.validate({ table, email, senha}, { strict: true })

        .then(async () => {
          try {
             var data = await logar(table, email, senha).then(
            ).catch((e) => console.log(e))
            // eslint-disable-next-line
            console.log(data,"teste")
            return data
          } catch (error) {
            console.log(error.message)
          }
        })
        .catch((e) => console.log(e));
          // eslint-disable-next-line
          console.log(dados,"2teste1")
        return dados
    } catch (e) {
      return console.log(e);
    }
  }

  const atualizaSenhaBff = async (table, palavraChave, email, novaSenha) => {
    try {

      const schema = yup.object().shape({
        table: yup.string().required(),
        palavraChave: yup.string().required(),
        email: yup.string().required(),
        novaSenha: yup.string().required(),
      });


      schema.validate({ table, palavraChave, email, novaSenha}, { strict: true })

        .then(async () => {
          try {
            await atualizaSenha(table, palavraChave, email, novaSenha).then(
              console.log("Atualizado")
            ).catch((e) => console.log(e))
          } catch (error) {
            console.log(error.message)
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      return console.log(e);
    }
  }

  const atualizaProdutoBff = async (table, id, quantidade) => {
    try {

      const schema = yup.object().shape({
        table: yup.string().required(),
        id: yup.string().required(),
        quantidade: yup.string().required(),
      });


      schema.validate({ table, id, quantidade}, { strict: true })

        .then(async () => {
          try {
            await atualizaProduto(table, id, quantidade).then(
              console.log("Atualizado")
            ).catch((e) => console.log(e))
          } catch (error) {
            console.log(error.message)
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      return console.log(e);
    }
  }

  return {
    registrarbff,
    logarBff,
    listaComprasBff,
    inserirCompraBff,
    listaPedidosBff,
    atualizaProdutoBff,
    atualizaSenhaBff
  }
}
