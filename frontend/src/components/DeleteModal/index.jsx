import { TrashIcon, XIcon } from '@phosphor-icons/react'

import './styles.css'

export function DeleteModal({
  isOpen,
  title,
  confirmText = 'Deletar',
  cancelText = 'Cancelar',
  onClose,
  onConfirm,
  loading = false
}) {
  if (!isOpen) return null

  function handleConfirm() {
    if (loading) return
    onConfirm?.()
  }

  return (
    <div className="modal-overlay">
      <div className="delete-modal">

        <button
          className="delete-close-btn"
          onClick={onClose}
          disabled={loading}
        >
          <XIcon size={20} weight="bold" />
        </button>

        <div className="modal-icon">
          <TrashIcon size={52} />
        </div>

        <h2>{title}</h2>

        <div className="modal-actions">
          <button
            className="btn-cancel"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            className="btn-delete"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Deletando...' : confirmText}
          </button>
        </div>

      </div>
    </div>
  )
}
