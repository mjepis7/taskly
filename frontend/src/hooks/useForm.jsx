import { useState } from 'react'

export function useForm(config) {
  const buildInitialState = () => {
    const base = { ...(config.initialValues || {}) }

    for (const key in config.fields) {
      if (base[key] === undefined) {
        base[key] = ''
      }
    }

    return base
  }

  const [formData, setFormData] = useState(buildInitialState)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target

    const field = config.fields[name]
    const finalValue = field?.mask ? field.mask(value) : value

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }))

    // ✨ limpa erro enquanto o usuário corrige
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = {}

    for (const key in config.fields) {
      const field = config.fields[key]
      const value = formData[key]

      const isEmpty =
        value === undefined ||
        value === null ||
        value === ''

      if (field.required && isEmpty) {
        newErrors[key] = field.required
        continue
      }

      if (field.validate && !field.validate(value)) {
        newErrors[key] = field.invalid
      }
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      config.onSuccess?.(formData)
    }
  }

  function resetForm() {
    setFormData(buildInitialState())
    setErrors({})
  }

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    setFormData,
    setErrors,
    resetForm
  }
}
