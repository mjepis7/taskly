import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'

import './styles.css'

export function BackButton() {
  const navigate = useNavigate()

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      <ArrowLeft color="white" size={24} weight="bold" />
    </button>
  )
}
