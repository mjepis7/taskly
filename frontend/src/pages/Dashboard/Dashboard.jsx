
import './Dashboard.css';

// Importando todos os arquivos .png da pasta assets
import iconSearch from '../../assets/icon-search.png';
import iconFilter from '../../assets/icon-filter.png';
import iconProfile from '../../assets/icon-profile.png';
import iconEdit from '../../assets/icon-edit.png';
import iconDelete from '../../assets/icon-delete.png';

const mockTasks = [
  { id: 1, color: '#FF3366', title: 'Estudar', desc: 'Descricao sobre a tarefa', date: '12/05/2026', time: '10:30' },
  { id: 2, color: '#10E196', title: 'Passear', desc: 'Descricao sobre a tarefa', date: '13/05/2026', time: '08:00' },
  { id: 3, color: '#FFB800', title: 'Assistir', desc: 'Descricao sobre a tarefa', date: '14/05/2026', time: '14:00' },
  { id: 4, color: '#2940FF', title: 'Ler Livro', desc: 'Capítulo 4 de Engenharia de Software', date: '15/05/2026', time: '16:00' }
];

export function Dashboard() {
  return (
    <div className="dashboard-web-container">
      <div className="dashboard-content">
        
        {/* CABEÇALHO */}
        <header className="dash-header">
          <div className="user-greeting">
            <p>Olá,</p>
            <h1>João</h1>
          </div>
          
          <div className="header-right">
            <button className="btn-nova-tarefa">+ Nova tarefa</button>
            {/* Botão de Perfil usando o .png */}
            <button className="profile-btn">
              <img src={iconProfile} alt="Perfil" />
            </button>
          </div>
        </header>

        {/* CONTROLES (PESQUISA E FILTRO) */}
        <section className="controls-section">
          <div className="search-box">
            <img src={iconSearch} alt="Pesquisar" className="search-icon-img" />
            <input type="text" placeholder="Procure uma tarefa" />
          </div>
          <button className="btn-filter">
            <img src={iconFilter} alt="Filtrar" />
          </button>
        </section>

        {/* GRADE DE TAREFAS */}
        <main className="tasks-grid">
          {mockTasks.map(task => (
            <div key={task.id} className="task-card">
              
              <div className="card-top">
                <div className="color-dot" style={{ backgroundColor: task.color }}></div>
                <h3 className="task-title">{task.title}</h3>
              </div>
              
              <p className="task-desc">{task.desc}</p>
              
              <div className="card-details">
                <span>📅 {task.date}</span>
                <span>🕒 {task.time}</span>
              </div>
              
              {/* Ações do card usando os arquivos .png de editar e excluir */}
              <div className="card-actions">
                <button><img src={iconEdit} alt="Editar" /></button>
                <button><img src={iconDelete} alt="Excluir" /></button>
              </div>

            </div>
          ))}
        </main>

      </div>
    </div>
  );
}
