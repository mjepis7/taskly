import { useState } from 'react';
import './MinhaConta.css';
import setaVoltar from '../../assets/seta-voltar.png'; // Verifique se este é o nome correto do seu ícone

export function MinhaConta() {
  const [cpf, setCpf] = useState('');
  const [data, setData] = useState('');

  // Máscara automática para CPF (XXX.XXX.XXX-XX)
  const handleCpf = (e) => {
    let valor = e.target.value.replace(/\D/g, ''); // Tira tudo que não é número
    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 números
    
    // Aplica a formatação
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    setCpf(valor);
  };

  // Máscara automática para Data (XX/XX/XXXX)
  const handleData = (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 8) valor = valor.slice(0, 8);
    
    if (valor.length > 4) {
      valor = `${valor.slice(0, 2)}/${valor.slice(2, 4)}/${valor.slice(4)}`;
    } else if (valor.length > 2) {
      valor = `${valor.slice(0, 2)}/${valor.slice(2)}`;
    }
    setData(valor);
  };

  return (
    <div className="minha-conta-web-container">
      
      {/* CABEÇALHO WIDE COM DEGRADÊ */}
      <header className="conta-header">
        <button className="back-btn">
          <img src={setaVoltar} alt="Voltar" />
        </button>
        <h2>MINHA CONTA</h2>
        <div className="header-spacer"></div> {/* Mantém o título perfeitamente centralizado */}
      </header>

      {/* FORMULÁRIO CENTRALIZADO PARA DESKTOP */}
      <main className="conta-form-wrapper">
        <form className="conta-form" onSubmit={(e) => e.preventDefault()}>
          
          <div className="input-group">
            <label>NOME</label>
            {/* REMOVIDO: defaultValue="João" */}
            <input type="text" placeholder="Digite seu nome" />
          </div>

          <div className="input-group">
            <label>CPF</label>
            {/* Mantido com State e Máscara */}
            <input 
              type="text" 
              placeholder="XXX.XXX.XXX-XX" 
              value={cpf}
              onChange={handleCpf}
            />
          </div>

          <div className="input-group">
            <label>DATA DE NASCIMENTO</label>
            {/* Mantido com State e Máscara */}
            <input 
              type="text" 
              placeholder="XX/XX/XXXX" 
              value={data}
              onChange={handleData}
            />
          </div>

          <div className="input-group">
            <label>E-MAIL</label>
            {/* REMOVIDO: defaultValue="*********@gmail.com" */}
            <input type="email" placeholder="Digite seu e-mail" />
          </div>

          <div className="input-group">
            <label>SENHA</label>
            {/* REMOVIDO: defaultValue="********" */}
            <input type="password" placeholder="Digite sua senha" />
          </div>

          <div className="conta-actions">
            <button type="submit" className="btn-salvar">Salvar alterações</button>
            <button type="button" className="btn-excluir">Excluir conta</button>
          </div>

        </form>
      </main>

    </div>
  );
}