import { useState } from 'react'

import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { DeleteModal } from '../../components/DeleteModal'

import './styles.css'

export function Profile() {
  const [cpf, setCpf] = useState('')
  const [data, setData] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleCpf(e) {
    let valor = e.target.value.replace(/\D/g, '')

    if (valor.length > 11) {
      valor = valor.slice(0, 11)
    }

    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2')

    setCpf(valor)
  }

  function handleData(e) {
    let valor = e.target.value.replace(/\D/g, '')

    if (valor.length > 8) {
      valor = valor.slice(0, 8)
    }

    if (valor.length > 4) {
      valor = `${valor.slice(0, 2)}/${valor.slice(2, 4)}/${valor.slice(4)}`
    } else if (valor.length > 2) {
      valor = `${valor.slice(0, 2)}/${valor.slice(2)}`
    }

    setData(valor)
  }

  function handleSubmit(e) {
    e.preventDefault()

    alert('Alterações salvas com sucesso!')
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <BackButton />

        <h2>MINHA CONTA</h2>

        <div className="header-spacer"></div>
      </header>

      <main className="profile-form-wrapper">
        <form className="profile-form" onSubmit={handleSubmit}>
          <Input label="Nome" type="text" placeholder="Digite seu nome" />

          <Input
            label="CPF"
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={handleCpf}
          />

          <Input
            label="Data de nascimento"
            type="text"
            placeholder="00/00/0000"
            value={data}
            onChange={handleData}
          />

          <Input label="E-mail" type="email" placeholder="Digite seu e-mail" />

          <Input label="Senha" type="password" placeholder="Digite sua senha" />

          <div className="profile-actions">
            <Button type="submit">Salvar alterações</Button>

            <Button
              style={{ background: 'red', marginTop: 10 }}
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              Excluir conta
            </Button>
          </div>
        </form>
      </main>

      <DeleteModal
        isOpen={isModalOpen}
        title={'Deseja mesmo deletar sua conta?'}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          alert('Conta deletada!')
          setIsModalOpen(false)
        }}
      />
    </div>
  )
}
