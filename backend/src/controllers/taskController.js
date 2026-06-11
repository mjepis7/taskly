const Task = require('../models/Task');

// 1. Criar uma nova tarefa
exports.criarTarefa = async (req, res) => {
  try {
    const novaTarefa = new Task({
      title: req.body.title,
      desc: req.body.desc,
      date: req.body.date,
      time: req.body.time,
      status: req.body.status,
      usuario: req.usuario.id // Pega o ID de quem está logado
    });

    const tarefaSalva = await novaTarefa.save();
    res.status(201).json(tarefaSalva);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar a tarefa.' });
  }
};

// 2. Listar as tarefas do usuário logado
exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await Task.find({ usuario: req.usuario.id });
    res.json(tarefas);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar tarefas.' });
  }
};

// 3. Atualizar uma tarefa (Editar texto ou mudar status)
exports.atualizarTarefa = async (req, res) => {
  try {
    let tarefa = await Task.findById(req.params.id);

    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada.' });

    if (tarefa.usuario.toString() !== req.usuario.id) {
      return res.status(401).json({ erro: 'Não autorizado a alterar esta tarefa.' });
    }

    tarefa = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tarefa);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar a tarefa.' });
  }
};

// 4. Deletar uma tarefa
exports.deletarTarefa = async (req, res) => {
  try {
    let tarefa = await Task.findById(req.params.id);

    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada.' });

    if (tarefa.usuario.toString() !== req.usuario.id) {
      return res.status(401).json({ erro: 'Não autorizado a deletar esta tarefa.' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Tarefa removida com sucesso!' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao deletar a tarefa.' });
  }
};