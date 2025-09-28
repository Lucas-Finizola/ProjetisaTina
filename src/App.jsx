import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import TinaHomePage from './pages/Home/TinaHomePage';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Projetos from './pages/Projetos';
import ScrollToTop from './components/common/ScrollToTop.jsx';
import TinaWrapper from './components/TinaProvider.jsx';

// Importações das páginas de detalhes
import ServiceDetail from './pages/Services/ServiceDetail.jsx';
import ProjetoDetail from './pages/Projetos/ProjetoDetail.jsx';

// Importações para Notícias
import Noticias from './pages/Noticias';
import NoticiaDetail from './pages/Noticias/NoticiaDetail.jsx';

// Componente especial para redirecionar para a página de admin estática
const AdminRedirect = () => {
  React.useEffect(() => {
    // window.location.replace garante que o React Router seja ignorado
    // e que a página de admin seja carregada diretamente pelo servidor.
    window.location.replace('/admin/index.html');
  }, []); // O array de dependências vazio garante que isso rode apenas uma vez

  return null; // Não renderiza nada, apenas redireciona
};

function App() {
  return (
    <TinaWrapper>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-100 relative">
          <Header />
          <main>
            <Routes>
              {/* Rota especial para o admin que força o redirecionamento */}
              <Route path="/admin/*" element={<AdminRedirect />} />

              {/* Rotas principais */}
              <Route path="/" element={<TinaHomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projetos" element={<Projetos />} /> 
              <Route path="/noticias" element={<Noticias />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Rotas de Detalhes Dinâmicas */}
              <Route path="/servicos/:id" element={<ServiceDetail />} />
              <Route path="/projetos/:slug" element={<ProjetoDetail />} />
              <Route path="/noticias/:slug" element={<NoticiaDetail />} />

            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TinaWrapper>
  );
}

export default App;
