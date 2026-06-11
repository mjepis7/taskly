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
  } = useTasks()

  return (
    <div className="task-web-container">
      <div className="task-content">
        <Header
          userName="João"
          buttonTo="/novatarefa"
          buttonText="+ Nova tarefa"
        />

        <section className="controls-section">
          <div className="search-box">
            <MagnifyingGlassIcon size={20} />

            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Procure uma tarefa"
            />
          </div>

          <button className="btn-filter" onClick={() => setIsFilterOpen(true)}>
            <SlidersIcon size={20} />
          </button>
        </section>

        <main className="tasks-grid">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : tasks.length === 0 ? (
            <p className="empty-message">Nenhuma tarefa cadastrada.</p>
          ) : (
            <p className="empty-message">Nenhuma tarefa encontrada.</p>
          )}
        </main>
      </div>

      <MobileMenu />

      <EditTaskModal
        isOpen={isEditOpen}
        task={selectedTask}
        setTask={setSelectedTask}
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
