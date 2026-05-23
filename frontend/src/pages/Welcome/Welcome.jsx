import './Welcome.css';
import heroImg from '../../assets/hero.png';

export function Welcome() {
  return (
    <div className="welcome-container">
      
      <h1>Organize suas<br />tarefas</h1>
      
      <img src={heroImg} alt="App Taskly" className="hero-img" />
      
      <p>Tudo o que você precisa<br />para organizar suas tarefas.</p>
      
      <div className="buttons-container">
        <button>Entrar</button>
        <button>Cadastre-se</button>
      </div>

    </div>
  );
}