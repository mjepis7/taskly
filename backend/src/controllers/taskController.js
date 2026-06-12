const Task = require('../models/Task')

exports.criarTarefa = async (req, res) => {
  try {
    const novaTarefa = new Task({
      title: req.body.title,
      desc: req.body.desc,
      date: req.body.date,
      time: req.body.time,
      status: req.body.status || 'Em andamento',
      usuario: req.usuario.id
    })

    const tarefaSalva = await novaTarefa.save()
    return res.status(201).json(tarefaSalva)

  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao criar a tarefa.' })
  }
}

exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await Task.find({ usuario: req.usuario.id })
    return res.json(tarefas)

  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao buscar tarefas.' })
  }
}

exports.atualizarTarefa = async (req, res) => {
  try {
    const tarefa = await Task.findById(req.params.id)

    if (!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' })
    }

    if (tarefa.usuario.toString() !== req.usuario.id) {
      return res.status(401).json({ erro: 'Não autorizado.' })
    }

    const { title, desc, date, time, status } = req.body

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        desc,
        date,
        time,
        status
      },
      { new: true }
    )

    return res.json(updated)

  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao atualizar a tarefa.' })
  }
}

exports.deletarTarefa = async (req, res) => {
  try {
    const tarefa = await Task.findById(req.params.id)

    if (!tarefa) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' })
    }

    if (tarefa.usuario.toString() !== req.usuario.id) {
      return res.status(401).json({ erro: 'Não autorizado.' })
    }

    await Task.findByIdAndDelete(req.params.id)

    return res.json({ mensagem: 'Tarefa removida com sucesso!' })

  } catch (erro) {
    return res.status(500).json({ erro: 'Erro ao deletar a tarefa.' })
  }
}
