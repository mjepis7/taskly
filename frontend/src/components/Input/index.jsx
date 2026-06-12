import './styles.css'

export function Input({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  style,
  error,
  disabled,
  ...props
}) {
  return (
    <div className="input-field" style={style}>
      {label && <label htmlFor={name}>{label}</label>}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`input ${error ? 'input-error' : ''}`}
        {...props}
      />

      {error && <span className="error-text">{error}</span>}
    </div>
  )
}
