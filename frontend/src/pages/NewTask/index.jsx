import { useNavigate } from 'react-router-dom'
import { CalendarBlankIcon, ClockIcon } from '@phosphor-icons/react'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { MobileMenu } from '../../components/MobileMenu'
import { Header } from '../../components/Header'

import { useForm } from '../../hooks/useForm'
import { TASK_STATUS, EDITABLE_STATUS_OPTIONS } from '../../utils/status'

import api from '../../api'

import './styles.css'
import { useState } from 'react'

export function NewTask() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const nomeUsuario = localStorage.getItem('userName') || 'Usuário'

  const { formData, errors, handleChange, handleSubmit, setFormData } = useForm({
    initialValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      status: TASK_STATUS.DOING
    },

    fields: {
      title: {
        required: 'Digite o nome da tarefa'
      },
      description: {
        required: 'Digite uma descrição'
      },
      date: {
        required: 'Selecione uma data'
      },
      time: {
        required: 'Selecione um horário'
      }
    },

    onSuccess: async (data) => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        // O token é adicionado automaticamente pelo interceptor em api.js
        await api.post('/tasks', {
          title: data.title,
          desc: data.description,
          date: data.date,
          time: data.time,
          status: data.status
        })

        navigate('/tasks')
      } catch (error) {
        console.error(error)
        setErrorMessage('Erro ao salvar a tarefa no banco de dados.')
      } finally {
        setIsLoading(false)
      }
    }
  })

  return (
    <div className="new-task-container">
      <div className="new-task-content">
        <Header
          userName={nomeUsuario}
          buttonTo="/tasks"
          buttonText="📋 Minhas tarefas"
        />

        <main className="new-task-main">
          <div className="form-intro">
            <h2>Criar nova tarefa</h2>
            <p>Preencha os dados da sua nova tarefa</p>
          </div>

          <form className="new-task-form" onSubmit={handleSubmit}>
            {errorMessage && (
              <p className="error-message">{errorMessage}</p>
            )}

            <Input
              name="title"
              label="Nome da tarefa"
              placeholder="Digite o nome da tarefa"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
            />

            <div className="textarea-group">
              <label>Descrição</label>
              <textarea
                name="description"
                placeholder="Digite uma descrição para a tarefa"
                rows="5"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="error-message">{errors.description}</p>
              )}
            </div>

            <div className="date-time-row">
              <div className="date-time-field">
                <label>Data</label>
                <div className="date-time-input">
                  <CalendarBlankIcon size={20} />
                  <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                {errors.date && <p className="error-message">{errors.date}</p>}
              </div>

              <div className="date-time-field">
                <label>Hora</label>
                <div className="date-time-input">
                  <ClockIcon size={20} />
                  <input
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
                {errors.time && <p className="error-message">{errors.time}</p>}
              </div>
            </div>

            <div className="colors-section">
              <label>Status da tarefa</label>

              <div className="color-options">
                {EDITABLE_STATUS_OPTIONS.map(item => (
                  <button
                    key={item.label}
                    type="button"
                    className={`color-dot ${formData.status === item.label ? 'selected' : ''
                      }`}
                    style={{ backgroundColor: item.color }}
                    onClick={() =>
                      setFormData(prev => ({
                        ...prev,
                        status: item.label
                      }))
                    }
                    title={item.label}
                  />
                ))}
              </div>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Criando tarefa...' : 'Criar tarefa'}
            </Button>
          </form>
        </main>
      </div>

      <MobileMenu />
    </div>
  )
}
