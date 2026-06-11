import { TrashIcon, XIcon } from '@phosphor-icons/react'

import './styles.css'

export function DeleteModal({
  isOpen,
  title,
  confirmText = 'Deletar',
  cancelText = 'Cancelar',
  onClose,
  onConfirm
}) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <button className="delete-close-btn" onClick={onClose}>
          <XIcon size={20} weight="bold" />
        </button>

        <div className="modal-icon">
          <TrashIcon size={52} />
        </div>

        <h2>{title}</h2>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            {cancelText}
          </button>

          <button className="btn-delete" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
