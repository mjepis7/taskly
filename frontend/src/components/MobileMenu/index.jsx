import { useLocation, useNavigate } from 'react-router-dom'
import { ListBulletsIcon, PlusIcon } from '@phosphor-icons/react'

import './styles.css'

export function MobileMenu() {
  const navigate = useNavigate()
  const location = useLocation()

  const isTasksPage = location.pathname === '/tasks'
  const isNewTaskPage = location.pathname === '/new-task'

  return (
    <footer className="mobile-bottom-nav">
      <button
        className={`nav-item ${isTasksPage ? 'active' : ''}`}
        onClick={() => navigate('/tasks')}
      >
        <ListBulletsIcon size={22} weight="bold" />
        <p>Minhas tarefas</p>
      </button>

      <button
        className={`nav-item ${isNewTaskPage ? 'active' : ''}`}
        onClick={() => navigate('/new-task')}
      >
        <PlusIcon size={22} weight="bold" />
        <p>Nova tarefa</p>
      </button>
    </footer>
  )
}
