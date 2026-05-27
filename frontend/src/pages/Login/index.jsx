import { useNavigate } from 'react-router-dom'

import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { useForm } from '../../hooks/useForm'

import { validateEmail, validatePassword } from '../../utils/validations'

import { errors as errorMessages } from '../../utils/errors'

import './styles.css'

export function Login() {
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

    onSuccess: () => {
      navigate('/tarefas')
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

        <Button type="submit">Entrar</Button>
      </form>
    </main>
  )
}
