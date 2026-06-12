import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'

import './styles.css'

export function BackButton({ to = null }) {
  const navigate = useNavigate()

  function handleClick() {
    // Se tiver rota definida, vai pra ela
    // senão volta no histórico
    if (to) {
      navigate(to)
    } else {
      navigate(-1)
    }
  }

  return (
    <button
      type="button"
      className="back-button"
      onClick={handleClick}
      aria-label="Voltar"
    >
      <ArrowLeft color="white" size={24} weight="bold" />
    </button>
  )
}
