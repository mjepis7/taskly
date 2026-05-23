import './NovaTarefa.css';
import iconProfile from '../../assets/icon-profile.png';
import iconCalendar from '../../assets/icon-calendar.png';
import iconClock from '../../assets/icon-clock.png';

export function NovaTarefa() {
  return (
    <div className="new-task-web-container">
      
      {/* CABEÇALHO FULL-WIDTH (Ocupa a tela inteira do monitor) */}
      <header className="dash-header">
        <div className="user-greeting">
          <p>Olá,</p>
          <h1>João</h1>
        </div>
        <div className="header-right">
          <button className="profile-btn">
            <img src={iconProfile} alt="Perfil" />
          </button>
        </div>
      </header>

      {/* ÁREA CENTRALIZADA DO FORMULÁRIO */}
      <main className="form-wrapper">
        
        <section className="form-intro">
          <h1>Criar uma nova tarefa</h1>
          <p>Preencha os detalhes para adicionar uma nova tarefa</p>
        </section>

        <form className="task-form" onSubmit={(e) => e.preventDefault()}>
          
          {/* NOME DA TAREFA */}
          <div className="form-group-block">
            <label>Nome da Tarefa</label>
            <input type="text" placeholder="Digite o nome da tarefa" />
          </div>

          {/* DESCRIÇÃO */}
          <div className="form-group-block">
            <label>Descrição</label>
            <textarea placeholder="Descricao sobre a tarefa" rows="4"></textarea>
          </div>

          {/* DATA E HORA LADO A LADO NA WEB */}
          <div className="deadline-row">
            
            <div className="deadline-group">
              <label>Data</label>
              <div className="input-icon-wrapper">
                <img src={iconCalendar} alt="Calendário" className="input-icon-img" />
                <input type="text" placeholder="dd/mm/aaaa" />
              </div>
            </div>

            <div className="deadline-group">
              <label>Hora</label>
              <div className="input-icon-wrapper">
                <img src={iconClock} alt="Hora" className="input-icon-img" />
                <input type="text" placeholder="hh:mm" />
              </div>
            </div>

          </div>

          {/* SELEÇÃO DE CORES */}
          <div className="color-select-section">
            <label>Cor da Tarefa</label>
            <div className="color-options">
              <span className="color-dot" style={{backgroundColor: '#FF3366'}}></span>
              <span className="color-dot" style={{backgroundColor: '#10E196'}}></span>
              <span className="color-dot" style={{backgroundColor: '#FFB800'}}></span>
              <span className="color-dot" style={{backgroundColor: '#2940FF'}}></span>
            </div>
          </div>

          {/* BOTÃO SUBMIT */}
          <button type="submit" className="btn-criar">Criar Tarefa</button>
        </form>

      </main>
      
    </div>
  );
}