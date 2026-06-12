import { TaskCard } from '../../components/TaskCard'
import { DeleteModal } from '../../components/DeleteModal'
import { EditTaskModal } from '../../components/EditTaskModal'
import { FilterModal } from '../../components/FilterModal'
import { MobileMenu } from '../../components/MobileMenu'
import { Header } from '../../components/Header'

import { MagnifyingGlassIcon, SlidersIcon } from '@phosphor-icons/react'

import { useTasks } from '../../hooks/useTasks'

import './styles.css'

export function Tasks() {
  const {
    filteredTasks,

    isLoading,
    errorMessage,

    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    selectedTask,

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
  } = useTasks()

  const nomeUsuario = localStorage.getItem('userName') || 'Usuário'

  if (isLoading) {
    return (
      <div className="task-web-container">
        <p className="empty-message">Carregando tarefas...</p>
      </div>
    )
  }

  const isFiltering = Boolean(search || statusFilter)

  return (
    <div className="task-web-container">
      <div className="task-content">

        <Header
          userName={nomeUsuario}
          buttonTo="/new-task"
          buttonText="+ Nova tarefa"
        />

        {errorMessage && (
          <p className="tasks-error">{errorMessage}</p>
        )}

        <section className="controls-section">
          <div className="search-box">
            <MagnifyingGlassIcon size={20} />

            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Procure uma tarefa"
            />
          </div>

          <button
            className="btn-filter"
            onClick={() => setIsFilterOpen(true)}
          >
            <SlidersIcon size={20} />
          </button>
        </section>

        <main className="tasks-grid">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard
                key={task._id || task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="empty-message">
              {isFiltering
                ? 'Nenhuma tarefa encontrada com os filtros aplicados.'
                : 'Nenhuma tarefa cadastrada.'}
            </p>
          )}
        </main>
      </div>

      <MobileMenu />

      <EditTaskModal
        isOpen={isEditOpen}
        task={selectedTask}
        onClose={() => setIsEditOpen(false)}
        onConfirm={confirmEdit}
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        title={`Deseja deletar "${selectedTask?.title}"?`}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
      />

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
    </div>
  )
}
