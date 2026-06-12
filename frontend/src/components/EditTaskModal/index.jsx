import {
  XIcon,
  CalendarBlankIcon,
  ClockIcon,
  CaretDownIcon
} from '@phosphor-icons/react'

import { useState } from 'react'

import { EDITABLE_STATUS_OPTIONS, TASK_STATUS } from '../../utils/status'

import './styles.css'

// Normaliza a task para edição:
// - Date ISO -> formato do input type="date"
// - status sempre um valor editável (nunca o derivado "Atrasado")
function buildForm(task) {
  if (!task) return null

  return {
    ...task,
    status: task.status === TASK_STATUS.LATE ? TASK_STATUS.DOING : task.status,
    date: task.date?.includes('T')
      ? task.date.split('T')[0]
      : task.date
  }
}

export function EditTaskModal({ isOpen, onClose, onConfirm, task }) {
  const [form, setForm] = useState(() => buildForm(task))

  // Reset durante a renderização sempre que a task selecionada muda
  const taskId = task?._id || task?.id || null
  const [prevTaskId, setPrevTaskId] = useState(taskId)

  if (taskId !== prevTaskId) {
    setPrevTaskId(taskId)
    setForm(buildForm(task))
  }

  if (!isOpen || !form) return null

  function handleChange(field, value) {
    setForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  function handleConfirm() {
    onConfirm(form)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={e => e.stopPropagation()}>

        <div className="edit-header">
          <h2>Editar tarefa</h2>

          <button
            type="button"
            className="edit-close-btn"
            onClick={onClose}
          >
            <XIcon size={22} weight="bold" />
          </button>
        </div>

        <div className="edit-form">

          <input
            type="text"
            value={form.title || ''}
            onChange={e => handleChange('title', e.target.value)}
            placeholder="Título"
          />

          <input
            type="text"
            value={form.desc || ''}
            onChange={e => handleChange('desc', e.target.value)}
            placeholder="Descrição"
          />

          <div className="select-wrapper">
            <select
              value={form.status}
              onChange={e => handleChange('status', e.target.value)}
            >
              {EDITABLE_STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <CaretDownIcon size={20} className="select-icon" />
          </div>

          <div className="task-date-time">

            <div className="date-time-input">
              <CalendarBlankIcon size={20} />

              <input
                type="date"
                value={form.date || ''}
                onChange={e => handleChange('date', e.target.value)}
              />
            </div>

            <div className="date-time-input">
              <ClockIcon size={20} />

              <input
                type="time"
                value={form.time || ''}
                onChange={e => handleChange('time', e.target.value)}
              />
            </div>

          </div>
        </div>

        <div className="edit-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="btn-confirm"
            onClick={handleConfirm}
          >
            Confirmar
          </button>
        </div>

      </div>
    </div>
  )
}
