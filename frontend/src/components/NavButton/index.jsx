import { useNavigate } from 'react-router-dom'
import './styles.css'

export function NavButton({
  to,
  children,
  disabled = false,
  replace = false,
  ...props
}) {
  const navigate = useNavigate()

  function handleClick() {
    if (disabled) return
    navigate(to, { replace })
  }

  return (
    <button
      className="btn-nav"
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
