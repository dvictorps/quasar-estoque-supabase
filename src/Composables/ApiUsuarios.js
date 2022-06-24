import useSupabase from 'src/boot/supabase'

export default function apiUsuario () {
  const { supabase } = useSupabase()

  const registrar = async (table, register) => {
    const { data, error } = await supabase
      .from(table)
      .insert({
        ...register
      })
    if (error) throw error
    return data
  }
  const inserirCompra = async (table, valor, idUsuario, date, nome, estado, cidade, bairro, rua, numero, nomeProduto, idAdm) => {
    const { data, error } = await supabase
      .from(table)
      .insert({
        idUsuario: idUsuario, valor: valor, data: date, nome: nome, estado: estado, cidade: cidade, bairro: bairro, rua: rua, numero: numero, nomeProduto: nomeProduto, idAdm: idAdm
      })
    if (error) throw error
    return data
  }
  const listaCompras = async (table, userId) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('idUsuario', userId)
    if (error) throw error
    return data
  }
  const listaPedidos = async (table, idAdm) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('idAdm', idAdm)
    if (error) throw error
    return data
  }
  const atualizaSenha = async (table, palavraChave, email, novaSenha) => {
    const { data, error } = await supabase
      .from(table)
      .update({ senha: novaSenha })
      .match({ palavraChave: palavraChave, email: email })
    if (error) throw error
    return data
  }
  const atualizaProduto = async (table, id, quantidade) => {
    const { data, error } = await supabase
      .from(table)
      .update({ amount: quantidade - 1 })
      .match({ id: id })
    if (error) throw error
    return data
  }
  const logar = async (table, email, senha) => {
    const { data, error } = await supabase
      .from(table)
      .select('id, email, senha, nome, cidade, rua, bairro, estado, numero')
      .match({ email: email, senha: senha })
    if (error) throw error
    if (data.length === 0) {
      throw new Error('nenhum dado encontrado')
    } else {
      console.log(data)
      return data
    }
  }

  return {
    registrar,
    logar,
    listaCompras,
    inserirCompra,
    listaPedidos,
    atualizaProduto,
    atualizaSenha
  }
}
