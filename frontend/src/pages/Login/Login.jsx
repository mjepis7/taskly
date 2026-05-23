import './Login.css';
import setaVoltar from '../../assets/seta-voltar.png';

export function Login() {
  return (
    <div className="login-container">
      
      {/* CABEÇALHO */}
      <header className="login-header">
        <button className="back-button">
          <img src={setaVoltar} alt="Voltar" />
        </button>
        <h2>LOGIN</h2>
      </header>

      {/* FORMULÁRIO */}
      <main className="login-form">
        <div className="input-group">
          <label>CPF OU E-MAIL</label>
          <input type="text" placeholder="Digite seu CPF ou e-mail" />
        </div>

        <div className="input-group">
          <label>SENHA</label>
          <input type="password" placeholder="Digite sua senha" />
        </div>

        <button className="btn-login">Entrar</button>
      </main>
      
    </div>
  );
}