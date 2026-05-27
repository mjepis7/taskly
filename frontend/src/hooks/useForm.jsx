import { useState } from 'react'

export function useForm(config) {
  const [formData, setFormData] = useState(() => {
    const initial = {}

    for (const key in config.fields) {
      initial[key] = ''
    }

    return initial
  })

  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target

    const field = config.fields[name]
    const finalValue = field?.mask ? field.mask(value) : value

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = {}

    for (const key in config.fields) {
      const field = config.fields[key]
      const value = formData[key]

      if (field.required && !value?.trim()) {
        newErrors[key] = field.required
        continue
      }

      if (field.validate && !field.validate(value)) {
        newErrors[key] = field.invalid
      }
    }

    setErrors(newErrors)

    const hasError = Object.keys(newErrors).length > 0

    if (!hasError) {
      config.onSuccess?.(formData)
    }
  }

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    setFormData
  }
}
