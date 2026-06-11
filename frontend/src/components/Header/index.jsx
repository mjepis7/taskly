import { useNavigate } from 'react-router-dom'
import { UserIcon } from '@phosphor-icons/react'

import { NavButton } from '../NavButton'
import './styles.css'

export function Header({
  userName = 'Usuário',
  buttonTo = '/novatarefa',
  buttonText = '+ Nova tarefa'
}) {
  const navigate = useNavigate()

  return (
    <header className="task-header">
      <div className="user-greeting">
        <p>Olá,</p>
        <h1>{userName}</h1>
      </div>

      <div className="header-right">
        <NavButton to={buttonTo}>{buttonText}</NavButton>

        <button className="profile-btn" onClick={() => navigate('/perfil')}>
          <UserIcon size={24} weight="bold" />
        </button>
      </div>
    </header>
  )
}
