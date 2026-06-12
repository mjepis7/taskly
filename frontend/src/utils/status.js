export const TASK_STATUS = {
  DOING: 'Em andamento',
  DONE: 'Concluído',
  LATE: 'Atrasado'
}

export const STATUS_OPTIONS = [
  { label: TASK_STATUS.DOING, value: TASK_STATUS.DOING, color: '#FFB800' },
  { label: TASK_STATUS.DONE, value: TASK_STATUS.DONE, color: '#10E196' },
  { label: TASK_STATUS.LATE, value: TASK_STATUS.LATE, color: '#FF3366' }
]

// Status que o usuário controla manualmente. "Atrasado" é derivado
// automaticamente (data/hora vencida) e nunca é gravado no banco.
export const EDITABLE_STATUS_OPTIONS = STATUS_OPTIONS.filter(
  option => option.value !== TASK_STATUS.LATE
)

// Cor associada a cada status (usada em cards e seletores)
export const STATUS_COLORS = STATUS_OPTIONS.reduce((acc, { value, color }) => {
  acc[value] = color
  return acc
}, {})
