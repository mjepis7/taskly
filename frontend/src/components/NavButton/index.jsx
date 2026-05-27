import { useNavigate } from 'react-router-dom'
import './styles.css'

export function NavButton({ to, children }) {
  const navigate = useNavigate()

  return (
    <button className="btn-nav" onClick={() => navigate(to)}>
      {children}
    </button>
  )
}
