import { useNavigate } from 'react-router-dom'
import { UserIcon, SignOutIcon } from '@phosphor-icons/react'

import { NavButton } from '../NavButton'
import './styles.css'

export function Header({
  userName = 'Usuário',
  buttonTo = '/novatarefa',
  buttonText = '+ Nova tarefa'
}) {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')

    navigate('/', { replace: true })
  }

  return (
    <header className="task-header">
      <div className="user-greeting">
        <p>Olá,</p>
        <h1>{userName}</h1>
      </div>

      <div className="header-right">

        <NavButton to={buttonTo}>
          {buttonText}
        </NavButton>

        <button
          className="profile-btn"
          onClick={() => navigate('/profile')}
          title="Perfil"
        >
          <UserIcon size={24} weight="bold" />
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
          title="Sair"
        >
          <SignOutIcon size={24} weight="bold" />
        </button>

      </div>
    </header>
  )
}
