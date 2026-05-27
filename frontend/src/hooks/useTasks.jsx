import { useState } from 'react'

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks') || '[]')
  })

  const [selectedTask, setSelectedTask] = useState(null)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState(null)

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredTasks = tasks.filter(task => {
    const searchText = search.toLowerCase().trim()

    const matchSearch =
      task.title.toLowerCase().includes(searchText) ||
      task.desc.toLowerCase().includes(searchText)

    const matchStatus = !statusFilter || task.status === statusFilter

    return matchSearch && matchStatus
  })

  function updateTasks(updatedTasks) {
    setTasks(updatedTasks)

    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

  function handleEdit(task) {
    setSelectedTask(task)

    setIsEditOpen(true)
  }

  function handleDelete(task) {
    setSelectedTask(task)

    setIsDeleteOpen(true)
  }

  function confirmEdit() {
    if (!selectedTask) return

    const updated = tasks.map(task =>
      task.id === selectedTask.id ? selectedTask : task
    )

    updateTasks(updated)

    setIsEditOpen(false)

    setSelectedTask(null)
  }

  function confirmDelete() {
    if (!selectedTask) return

    const updated = tasks.filter(task => task.id !== selectedTask.id)

    updateTasks(updated)

    setIsDeleteOpen(false)

    setSelectedTask(null)
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
