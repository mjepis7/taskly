import './styles.css'

export function Input({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  style,
  error
}) {
  return (
    <div className="input-field" style={style}>
      <label>{label}</label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={error ? 'input-error' : ''}
      />

      {error && <span className="error-text">{error}</span>}
    </div>
  )
}
