'use strict'

const Tarefa = use('App/Models/Tarefa')
const Database = use('Database')


class TarefaController {

  async index ({ request, response, auth }) {
   const tarefa = await Tarefa.query().where('user_id', auth.user.id).fetch()
  //  const tarefa = Database.select('titulo', 'descricao').from('tarefas')
  //  .where('user_id', auth.user.id)

    return tarefa
  }


  async store ({ request, response, auth }) {
    try {
      const {id} = auth.user

      const data = request.only(["titulo", "descricao"])

      const tarefa = await Tarefa.create({...data, user_id: id})

      return tarefa

    } catch (err) {
      return response.status(500).send({ error: `Erro: ${err.message}`})
    }
  }



  async show ({ params, request, response }) {
   const tarefa = await Tarefa.query().where('id', params.id).where('user')

   return tarefa
  }



  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = TarefaController
