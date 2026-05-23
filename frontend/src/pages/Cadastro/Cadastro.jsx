import './Cadastro.css';
import setaVoltar from '../../assets/seta-voltar.png';

export function Cadastro() {
  return (
    <div className="cadastro-container">
      
      {/* CABEÇALHO */}
      <header className="cadastro-header">
        <button className="back-button">
          <img src={setaVoltar} alt="Voltar" />
        </button>
        <h2>CADASTRO</h2>
      </header>

      {/* FORMULÁRIO */}
      <main className="cadastro-form">
        <div className="input-group">
          <label>NOME</label>
          <input type="text" placeholder="Digite seu nome" />
        </div>

        <div className="input-group">
          <label>CPF</label>
          <input type="text" placeholder="Digite seu CPF" />
        </div>

        <div className="input-group">
          <label>DATA DE NASCIMENTO</label>
          <input type="text" placeholder="Digite a data" />
        </div>

        <div className="input-group">
          <label>E-MAIL</label>
          <input type="email" placeholder="Digite seu e-mail" />
        </div>

        <div className="input-group">
          <label>SENHA</label>
          <input type="password" placeholder="Digite sua senha" />
        </div>

        <button className="btn-cadastrar">Cadastrar</button>
      </main>
      
    </div>
  );
}