import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'

import welcome from '../../assets/images/welcome.svg'
import './styles.css'

export function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="welcome-container">
      <h1>
        Organize suas
        <br />
        tarefas
      </h1>

      <img
        src={welcome}
        alt="Um smartphone com uma lista de tarefas na tela. Há cinco itens na lista: o primeiro e o terceiro estão marcados como concluídos com um ícone de verificação azul, enquanto os outros três estão em branco. Uma barra de pesquisa azul está no topo da tela."
        className="hero-img"
      />

      <p>
        Tudo o que você precisa
        <br />
        para organizar suas tarefas.
      </p>

      <div className="buttons-container">
        <Button onClick={() => navigate('/entrar')}>Entrar</Button>
        <Button onClick={() => navigate('/cadastrar')}>Cadastre-se</Button>
      </div>
    </div>
  )
}
