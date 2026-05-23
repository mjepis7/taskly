import './DashboardVazio.css';
import iconProfile from '../../assets/icon-profile.png';
import iconSearch from '../../assets/icon-search.png';
import iconFilter from '../../assets/icon-filter.png';
import iconEmpty from '../../assets/icon-empty.png'; 

export function DashboardVazio() {
  return (
    <div className="dashboard-vazio-container">
      
      {/* CABEÇALHO (AGORA ELE ESTÁ LIVRE PARA ESTICAR 100%) */}
      <header className="dash-header">
        <div className="user-greeting">
          <p>Olá,</p>
          <h1>João</h1>
        </div>
        <div className="header-right">
          <button className="btn-nova-tarefa">+ Nova tarefa</button>
          <button className="profile-btn">
            <img src={iconProfile} alt="Perfil" />
          </button>
        </div>
      </header>

      {/* CONTEÚDO CENTRALIZADO */}
      <div className="dashboard-content">
        
        {/* PESQUISA E FILTRO */}
        <section className="controls-section">
          <div className="search-box">
            <img src={iconSearch} alt="Pesquisar" className="search-icon-img" />
            <input type="text" placeholder="Procure uma tarefa" />
          </div>
          <button className="btn-filter">
            <img src={iconFilter} alt="Filtrar" />
          </button>
        </section>

        {/* MENSAGEM DE LISTA VAZIA */}
        <main className="empty-state-section">
          <img src={iconEmpty} alt="Lista Vazia" className="empty-icon" />
          <h2>Sua lista está vazia</h2>
          <p>Crie sua primeira tarefa para começar a organizar</p>
        </main>

      </div>
      
    </div>
  );
}