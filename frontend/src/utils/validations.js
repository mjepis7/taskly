export const validateName = name => /^[A-Za-zÀ-ÿ\s]+$/.test(name?.trim() || '')

export const validateEmail = email => /\S+@\S+\.\S+/.test(email)

export const validatePassword = password => password.length >= 8

export const validateCpf = cpf => /^\d{11}$/.test(cpf)

export const validateBirthDate = dateString => {
  const date = new Date(dateString)
  return !isNaN(date) && date <= new Date(new Date().toDateString())
}
