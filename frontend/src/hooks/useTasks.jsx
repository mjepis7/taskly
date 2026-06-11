import { useState, useEffect } from 'react'
import api from '../api' // Nosso carteiro

export function useTasks() {
  // 1. As tarefas agora começam vazias, e não mais do localStorage
  const [tasks, setTasks] = useState([])

  const [selectedTask, setSelectedTask] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState(null)

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // 2. Função para buscar as tarefas do Back-end
  async function loadTasks() {
    try {
      const token = localStorage.getItem('token')
      
      const response = await api.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setTasks(response.data)
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error)
    }
  }

  // 3. O useEffect faz o loadTasks rodar sozinho assim que a tela abre
  useEffect(() => {
    loadTasks()
  }, [])

  const filteredTasks = tasks.filter(task => {
    const searchText = search.toLowerCase().trim()

    const matchSearch =
      task.title?.toLowerCase().includes(searchText) ||
      task.desc?.toLowerCase().includes(searchText)

    const matchStatus = !statusFilter || task.status === statusFilter

    return matchSearch && matchStatus
  })

  function handleEdit(task) {
    setSelectedTask(task)
    setIsEditOpen(true)
  }

  function handleDelete(task) {
    setSelectedTask(task)
    setIsDeleteOpen(true)
  }

  // 4. Salvar a edição no Banco de Dados
  async function confirmEdit() {
    if (!selectedTask) return

    try {
      const token = localStorage.getItem('token')
      // O MongoDB usa '_id', mas o front pode usar 'id'. Isso garante que funcione nos dois.
      const taskId = selectedTask._id || selectedTask.id 

      await api.put(`/tasks/${taskId}`, selectedTask, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Atualiza a tela sem precisar recarregar a página
      const updated = tasks.map(task =>
        (task._id || task.id) === taskId ? selectedTask : task
      )

      setTasks(updated)
      setIsEditOpen(false)
      setSelectedTask(null)
    } catch (error) {
      console.error(error)
      alert('Erro ao editar a tarefa.')
    }
  }

  // 5. Deletar do Banco de Dados
  async function confirmDelete() {
    if (!selectedTask) return

    try {
      const token = localStorage.getItem('token')
      const taskId = selectedTask._id || selectedTask.id

      await api.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Remove a tarefa da tela
      const updated = tasks.filter(task => (task._id || task.id) !== taskId)

      setTasks(updated)
      setIsDeleteOpen(false)
      setSelectedTask(null)
    } catch (error) {
      console.error(error)
      alert('Erro ao deletar a tarefa.')
    }
  }

  return {
    tasks,
    filteredTasks,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedTask,
    setSelectedTask,
    isEditOpen,
    setIsEditOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    isFilterOpen,
    setIsFilterOpen,
    handleEdit,
    handleDelete,
    confirmEdit,
    confirmDelete
  }
}