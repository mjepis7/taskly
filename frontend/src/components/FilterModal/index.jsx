import { X } from '@phosphor-icons/react'

import './styles.css'

export function FilterModal({
  isOpen,
  onClose,
  statusFilter,
  setStatusFilter
}) {
  if (!isOpen) return null

  const options = [
    { label: 'Todos', value: null, color: '#1d2f9d' },
    { label: 'Em andamento', value: 'Em andamento', color: '#FFB800' },
    { label: 'Concluído', value: 'Concluído', color: '#10E196' },
    { label: 'Atrasado', value: 'Atrasado', color: '#FF3366' }
  ]

  return (
    <div className="modal-overlay">
      <div className="filter-modal">
        <div className="filter-header">
          <h2>Filtrar tarefas</h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="filter-options">
          {options.map(opt => (
            <button
              key={opt.label}
              className={`filter-item ${
                statusFilter === opt.value ? 'active' : ''
              }`}
              onClick={() => {
                setStatusFilter(opt.value)
                onClose()
              }}
            >
              <span className="dot" style={{ backgroundColor: opt.color }} />
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
