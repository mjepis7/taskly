import { useState, useEffect } from 'react'
import api from '../api'
import { TASK_STATUS } from '../utils/status'

// Calcula o status efetivo da tarefa: marca como "Atrasado" quando a
// data/hora já passou e a tarefa ainda não foi concluída.
function getEffectiveStatus(task) {
  if (task.status === TASK_STATUS.DONE) return task.status

  if (task.date && task.time) {
    const day = task.date.split('T')[0]
    const taskDateTime = new Date(`${day}T${task.time}`)

    if (!isNaN(taskDateTime) && taskDateTime < new Date()) {
      return TASK_STATUS.LATE
    }
  }

  return task.status
}

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

  // Busca as tarefas na montagem. As chamadas de setState acontecem apenas
  // nos callbacks das promises (assíncronos), evitando renders em cascata.
  useEffect(() => {
    let active = true

    api.get('/tasks')
      .then(response => {
        if (active) setTasks(response.data)
      })
      .catch(error => {
        console.error('Erro ao buscar tarefas:', error)
        if (active) setErrorMessage('Erro ao buscar tarefas.')
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  // Expõe o status efetivo ("Atrasado") em um campo separado (displayStatus),
  // SEM sobrescrever o status real — assim a edição nunca grava o valor
  // derivado no banco. Busca, filtro e exibição usam o displayStatus.
  const tasksWithStatus = tasks.map(task => ({
    ...task,
    displayStatus: getEffectiveStatus(task)
  }))

  const filteredTasks = tasksWithStatus
    .filter(task => {
      const searchText = search.toLowerCase().trim()

      const matchSearch =
        task.title?.toLowerCase().includes(searchText) ||
        task.desc?.toLowerCase().includes(searchText)

      const matchStatus = !statusFilter || task.displayStatus === statusFilter

      return matchSearch && matchStatus
    })
    // Tarefas concluídas vão para o final da lista
    .sort((a, b) => {
      const doneA = a.displayStatus === TASK_STATUS.DONE ? 1 : 0
      const doneB = b.displayStatus === TASK_STATUS.DONE ? 1 : 0
      return doneA - doneB
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
