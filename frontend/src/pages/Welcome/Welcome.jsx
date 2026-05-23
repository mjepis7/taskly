import './Welcome.css';
import heroImg from '../../assets/hero.png'; 

export function Welcome() {
  return (
    <div className="welcome-container">
      <h1>Organize suas<br />tarefas</h1>
      
      <img src={heroImg} alt="Ilustração do aplicativo" className="hero-img" />
      
      <p className="subtitle">Tudo o que você precisa<br />para organizar suas tarefas.</p>
      
      <div className="button-group">
        <button className="btn-primary">Entrar</button>
        <button className="btn-primary">Cadastre-se</button>
      </div>
    </div>
  );
}