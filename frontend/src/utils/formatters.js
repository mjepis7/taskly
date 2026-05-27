export function formatCpf(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  return digits.replace(
    /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
    (_, p1, p2, p3, p4) => {
      let result = p1

      if (p2) result += `.${p2}`
      if (p3) result += `.${p3}`
      if (p4) result += `-${p4}`

      return result
    }
  )
}

export function formatDateInput(value) {
  const digits = value.replace(/\D/g, '').slice(0, 8)

  return digits.replace(/(\d{2})(\d)/, '$1/$2').replace(/(\d{2})(\d)/, '$1/$2')
}

export function formatDate(date) {
  if (!date) return ''

  const [year, month, day] = date.split('-')

  return `${day}/${month}/${year}`
}
