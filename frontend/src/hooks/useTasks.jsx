import { useState, useEffect } from 'react'
import api from '../api'

export function useTasks() {
  const [tasks, setTasks] = useState([])

  const [selectedTask, setSelectedTask] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState(null)

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  async function loadTasks() {
    setErrorMessage('')
    setIsLoading(true)

    try {
      const response = await api.get('/tasks')
      setTasks(response.data)
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error)
      setErrorMessage('Erro ao buscar tarefas.')
    } finally {
      setIsLoading(false)
    }
  }

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

  async function confirmEdit(updatedTask) {
    if (!updatedTask) return

    setErrorMessage('')

    try {
      const taskId = updatedTask._id || updatedTask.id

      const payload = {
        title: updatedTask.title,
        desc: updatedTask.desc,
        date: updatedTask.date,
        time: updatedTask.time,
        status: updatedTask.status
      }

      await api.put(`/tasks/${taskId}`, payload)

      setTasks(prev =>
        prev.map(task =>
          (task._id || task.id) === taskId
            ? { ...task, ...payload }
            : task
        )
      )

      setIsEditOpen(false)
      setSelectedTask(null)
    } catch (error) {
      console.error(error)
      setErrorMessage(
        error.response?.data?.erro || 'Erro ao editar a tarefa.'
      )
    }
  }

  async function confirmDelete() {
    if (!selectedTask) return

    setErrorMessage('')

    try {
      const taskId = selectedTask._id || selectedTask.id

      await api.delete(`/tasks/${taskId}`)

      setTasks(prev =>
        prev.filter(task => (task._id || task.id) !== taskId)
      )

      setIsDeleteOpen(false)
      setSelectedTask(null)
    } catch (error) {
      console.error(error)
      setErrorMessage(
        error.response?.data?.erro || 'Erro ao deletar a tarefa.'
      )
    }
  }

  return {
    tasks,
    filteredTasks,

    isLoading,
    errorMessage,

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
