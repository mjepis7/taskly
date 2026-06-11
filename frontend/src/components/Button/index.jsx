import './styles.css'

export function Button({
  children,
  onClick,
  type = 'button',
  disabled,
  ...rest
}) {
  return (
    <button
      className="btn"
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
