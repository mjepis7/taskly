import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { useForm } from '../../hooks/useForm'

import {
  validateName,
  validateEmail,
  validatePassword,
  validateCpf,
  validateBirthDate
} from '../../utils/validations'

import { formatCpf } from '../../utils/formatters'
import { errors as errorMessages } from '../../utils/errors'

import api from '../../api'

import './styles.css'

export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const { formData, errors, handleChange, handleSubmit } = useForm({
    fields: {
      name: {
        required: errorMessages.requiredName,
        validate: validateName,
        invalid: errorMessages.invalidName
      },

      cpf: {
        required: errorMessages.requiredCpf,
        mask: formatCpf,
        validate: value => validateCpf(value.replace(/\D/g, '')), // valida só dígitos
        invalid: errorMessages.invalidCpf
      },

      birthDate: {
        required: errorMessages.requiredBirthDate,
        validate: validateBirthDate,
        invalid: errorMessages.invalidBirthDate
      },

      email: {
        required: errorMessages.requiredEmail,
        validate: validateEmail,
        invalid: errorMessages.invalidEmail
      },

      password: {
        required: errorMessages.requiredPassword,
        validate: validatePassword,
        invalid: errorMessages.invalidPassword
      }
    },

    onSuccess: async (data) => {
      setIsLoading(true)
      setErrorMessage('')

      try {
        await api.post('/auth/register', {
          nome: data.name,
          cpf: data.cpf,
          dataNascimento: data.birthDate,
          email: data.email,
          senha: data.password
        })

        navigate('/login')
      } catch (error) {
        console.error(error)

        setErrorMessage(
          error.response?.data?.erro ||
          'Erro ao realizar cadastro. Tente novamente.'
        )
      } finally {
        setIsLoading(false)
      }
    }
  })

  return (
    <main className="register">
      <header className="register-header">
        <BackButton />
        <h1 className="register-title">Cadastro</h1>
      </header>

      <form className="register-form" onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Nome"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <Input
          name="cpf"
          label="CPF"
          value={formData.cpf}
          onChange={handleChange}
          error={errors.cpf}
        />

        <Input
          name="birthDate"
          label="Data de nascimento"
          type="date"
          value={formData.birthDate}
          onChange={handleChange}
          error={errors.birthDate}
        />

        <Input
          name="email"
          label="E-mail"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          name="password"
          label="Senha"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        {errorMessage && (
          <p className="register-error">{errorMessage}</p>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>

        <p className="register-redirect">
          Já possui uma conta? <Link to="/login">Entrar</Link>
        </p>
      </form>
    </main>
  )
}
