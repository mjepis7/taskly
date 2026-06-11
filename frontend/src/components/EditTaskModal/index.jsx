import {
  XIcon,
  CalendarBlankIcon,
  ClockIcon,
  CaretDownIcon
} from '@phosphor-icons/react'

import './styles.css'

export function EditTaskModal({ isOpen, onClose, onConfirm, task, setTask }) {
  if (!isOpen || !task) return null

  function handleChange(field, value) {
    setTask(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={e => e.stopPropagation()}>
        <div className="edit-header">
          <h2>Editar tarefa</h2>

          <button className="edit-close-btn" onClick={onClose}>
            <XIcon size={22} weight="bold" />
          </button>
        </div>

        <div className="edit-form">
          <input
            type="text"
            placeholder="Título"
            value={task.title || ''}
            onChange={e => handleChange('title', e.target.value)}
          />

          <input
            type="text"
            placeholder="Descrição"
            value={task.desc || ''}
            onChange={e => handleChange('desc', e.target.value)}
          />

          <div className="select-wrapper">
            <select
              value={task.status}
              onChange={e => handleChange('status', e.target.value)}
            >
              <option value="Em andamento">Em andamento</option>

              <option value="Concluído">Concluído</option>

              <option value="Atrasado">Atrasado</option>
            </select>

            <CaretDownIcon size={20} className="select-icon" />
          </div>

          <div className="task-date-time">
            <div className="date-time-input">
              <CalendarBlankIcon size={20} />

              <input
                type="date"
                value={task.date || ''}
                onChange={e => handleChange('date', e.target.value)}
              />
            </div>

            <div className="date-time-input">
              <ClockIcon size={20} />

              <input
                type="time"
                value={task.time || ''}
                onChange={e => handleChange('time', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="edit-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>

          <button className="btn-confirm" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
