import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../api'

import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { DeleteModal } from '../../components/DeleteModal'

import { formatCpf } from '../../utils/formatters'

import './styles.css'

export function Profile() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    email: ''
  })

  const [loading, setLoading] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    async function loadUser() {
      try {
        setError('')
        setSuccess('')

        const res = await api.get('/user/me')

        setForm({
          nome: res.data.nome || '',
          cpf: res.data.cpf || '',
          dataNascimento: res.data.dataNascimento?.split('T')[0] || '',
          email: res.data.email || ''
        })
      } catch (err) {
        console.error(err)
        setError('Erro ao carregar dados do usuário.')
      }
    }

    loadUser()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target

    let finalValue = value

    if (name === 'cpf') {
      finalValue = formatCpf(value)
    }

    setForm(prev => ({
      ...prev,
      [name]: finalValue
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    setError('')
    setSuccess('')

    try {
      await api.put('/user/me', form)
      localStorage.setItem('userName', form.nome)

      setSuccess('Perfil atualizado com sucesso!')
    } catch (err) {
      console.error(err)
      setError('Erro ao atualizar perfil.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteAccount() {
    try {
      setLoadingDelete(true)

      await api.delete('/user/me')

      localStorage.removeItem('token')
      localStorage.removeItem('userName')

      navigate('/', { replace: true })
    } catch (error) {
      setError('Erro ao deletar conta.')
    } finally {
      setLoadingDelete(false)
      setIsModalOpen(false)
    }
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <BackButton />
        <h2>MINHA CONTA</h2>
        <div />
      </header>

      <main className="profile-form-wrapper">
        <form className="profile-form" onSubmit={handleSubmit}>
          <Input name="nome" label="Nome" value={form.nome} onChange={handleChange} />
          <Input name="cpf" label="CPF" value={form.cpf} onChange={handleChange} />

          <Input
            name="dataNascimento"
            label="Data de nascimento"
            type="date"
            value={form.dataNascimento}
            onChange={handleChange}
          />

          <Input
            name="email"
            label="E-mail"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <div className="profile-actions">
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar alterações'}
            </Button>

            <Button
              type="button"
              style={{ background: 'red', marginTop: 10 }}
              onClick={() => setIsModalOpen(true)}
            >
              Excluir conta
            </Button>
          </div>
        </form>
      </main>

      <DeleteModal
        isOpen={isModalOpen}
        title="Deseja mesmo deletar sua conta?"
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  )
}
