import {
  XIcon,
  CalendarBlankIcon,
  ClockIcon,
  CaretDownIcon
} from '@phosphor-icons/react'

import { useEffect, useState } from 'react'

import { STATUS_OPTIONS } from '../../utils/status'

import './styles.css'

export function EditTaskModal({ isOpen, onClose, onConfirm, task }) {
  const [form, setForm] = useState(null)

  // Sempre que abrir o modal, copia a task original
  useEffect(() => {
    if (task) {
      setForm({
        ...task,
        // converte Date ISO para formato aceito pelo input type="date"
        date: task.date?.includes('T')
          ? task.date.split('T')[0]
          : task.date
      })
    }
  }, [task])

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
              {STATUS_OPTIONS.map(option => (
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
