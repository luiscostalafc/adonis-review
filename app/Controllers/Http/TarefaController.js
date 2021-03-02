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



  async show ({ params, request, response, auth }) {
   const tarefa = await Tarefa.query().where('id', params.id).where('user_id','=', auth.user.id).first()

   if(!tarefa) {
     return response.status(401).send({message: 'Nenhum registro localizado'})
   }

   return tarefa
  }



  async update ({ params, request, response, auth }) {
   const { titulo, descricao } = request.all()

   const tarefa = await Tarefa.query().where('id', params.id).where('user_id','=', auth.user.id).first()

   if(!tarefa) {
     return response.status(401).send({message: 'Nenhum registro localizado'})
   }

   tarefa.titulo = titulo
   tarefa.descricao = descricao
   tarefa.id = params.id

   await tarefa.save()

   return tarefa

  }

  async destroy ({ params, request, response, auth }) {
    const tarefa = await Tarefa.query().where('id', params.id).where('user_id','=', auth.user.id).first()

   if(!tarefa) {
     return response.status(401).send({message: 'Nenhum registro localizado'})
   }

   await tarefa.delete()
   return response.status(200).send({message: 'registro removido'})

  }
}

module.exports = TarefaController
