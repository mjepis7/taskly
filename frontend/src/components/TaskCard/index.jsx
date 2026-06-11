import {
  ClockIcon,
  CalendarBlankIcon,
  PencilSimpleIcon,
  TrashIcon
} from '@phosphor-icons/react'

import { formatDate } from '../../utils/formatters'

import './styles.css'

export function TaskCard({ task, onEdit, onDelete }) {
  function getStatusColor(status) {
    switch (status) {
      case 'Concluído':
        return '#10E196'
      case 'Atrasado':
        return '#FF3366'
      default:
        return '#FFB800'
    }
  }

  return (
    <div className="task-card">
      <div className="card-top">
        <div
          className="color-dot"
          style={{
            backgroundColor: getStatusColor(task.status)
          }}
        />

        <div>
          <h3 className="task-title">{task.title}</h3>

          <p className="task-status">{task.status}</p>
        </div>
      </div>

      <p className="task-desc">{task.desc}</p>

      <div className="card-details">
        <span>
          <CalendarBlankIcon size={20} weight="bold" />

          {formatDate(task.date)}
        </span>

        <span>
          <ClockIcon size={20} weight="bold" />

          {task.time}
        </span>
      </div>

      <div className="card-actions">
        <button onClick={() => onEdit && onEdit(task)}>
          <PencilSimpleIcon size={20} weight="bold" />
        </button>

        <button onClick={() => onDelete && onDelete(task)}>
          <TrashIcon size={20} weight="bold" />
        </button>
      </div>
    </div>
  )
}
