import './styles.css'

export function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className} ${disabled ? 'btn-disabled' : ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
