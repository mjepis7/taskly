import {
  ClockIcon,
  CalendarBlankIcon,
  PencilSimpleIcon,
  TrashIcon
} from '@phosphor-icons/react'

import { formatDate } from '../../utils/formatters'
import { STATUS_COLORS, TASK_STATUS } from '../../utils/status'

import './styles.css'

export function TaskCard({ task, onEdit, onDelete }) {
  // Status exibido = status efetivo (inclui "Atrasado" derivado)
  const status = task.displayStatus || task.status
  const statusColor = STATUS_COLORS[status] || STATUS_COLORS[TASK_STATUS.DOING]
  const isDone = status === TASK_STATUS.DONE

  return (
    <div className={`task-card ${isDone ? 'is-done' : ''}`}>
      <div className="card-top">
        <div
          className="color-dot"
          style={{
            backgroundColor: statusColor
          }}
        />

        <div>
          <h3 className="task-title">{task.title}</h3>

          <p className="task-status">{status}</p>
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
        <button onClick={() => onEdit?.(task)}>
          <PencilSimpleIcon size={20} weight="bold" />
        </button>

        <button onClick={() => onDelete?.(task)}>
          <TrashIcon size={20} weight="bold" />
        </button>
      </div>
    </div>
  )
}
