import { useNavigate } from 'react-router-dom'

import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { useForm } from '../../hooks/useForm'

import { validateEmail, validatePassword } from '../../utils/validations'

import { errors as errorMessages } from '../../utils/errors'

// 1. IMPORTAMOS O NOSSO CARTEIRO AQUI
import api from '../../api'

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

    // 2. CONECTAMOS COM O BACK-END AQUI NO "onSuccess"
    onSuccess: async (data) => {
      try {
        // Envia o e-mail e a senha para a rota de login
        const response = await api.post('/auth/login', {
          email: data.email,
          senha: data.password // Traduzindo de 'password' (front) para 'senha' (back)
        })

        // Guarda o Token devolvido pelo back-end no "cofre" do navegador
        localStorage.setItem('token', response.data.token)
        
        // Guarda o Nome do usuário para usar no cabeçalho
        localStorage.setItem('userName', response.data.nome || response.data.name || 'Usuário')
        
        // Se tudo deu certo, libera a entrada e vai para a tela de tarefas
        navigate('/tarefas')
        
      } catch (error) {
        console.error(error)
        alert('E-mail ou senha incorretos. Tente novamente!')
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

        <Button type="submit">Entrar</Button>
      </form>
    </main>
  )
}