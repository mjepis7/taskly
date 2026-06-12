import { Link, useNavigate } from 'react-router-dom'

import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { useForm } from '../../hooks/useForm'

import { validateEmail, validatePassword } from '../../utils/validations'
import { errors as errorMessages } from '../../utils/errors'

import api from '../../api'

import './styles.css'
import { useState } from 'react'

export function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  const navigate = useNavigate()

  const { formData, errors, handleChange, handleSubmit } = useForm({
    fields: {
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

    // Executado apenas após validação do formulário
    onSuccess: async (data) => {
      setIsLoading(true)
      setLoginError('')

      try {
        // Autentica usuário no backend
        const response = await api.post('/auth/login', {
          email: data.email,
          senha: data.password
        })

        // Limpa possíveis dados antigos de sessão
        localStorage.removeItem('token')
        localStorage.removeItem('userName')

        // Salva nova sessão
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userName', response.data.user?.nome || 'Usuário')

        // Redireciona para área logada
        navigate('/tasks')

      } catch (error) {
        console.error(error)
        setLoginError('E-mail ou senha incorretos. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    }
  })

  return (
    <main className="login">
      <header className="login-header">
        <BackButton />
        <h1 className="login-title">Login</h1>
      </header>

      <form className="login-form" onSubmit={handleSubmit}>
        <Input
          name="email"
          label="E-mail"
          type="email"
          placeholder="Digite seu e-mail"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          name="password"
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        {loginError && (
          <p className="login-error">{loginError}</p>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>

        <p className="login-redirect">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </main>
  )
}
