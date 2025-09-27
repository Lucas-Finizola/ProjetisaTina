import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importando o Link
import logo from '../../assets/images/MARCA PROJETISA.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para fechar o menu ao clicar em um link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-green-600 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center md:grid md:grid-cols-3">
          {/* Coluna da Esquerda: Logo */}
          <div className="justify-self-start">
            <Link to="/">
              <img src={logo} alt="Logo da Projetisa" className="h-12" />
            </Link>
          </div>

          {/* Coluna Central: Navegação Desktop */}
          <div className="hidden md:flex justify-self-center">
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-gray-300">Início</Link></li>
              <li><Link to="/about" className="hover:text-gray-300">Sobre</Link></li>
              <li><Link to="/services" className="hover:text-gray-300">Serviços</Link></li>
              <li><Link to="/projetos" className="hover:text-gray-300">Projetos</Link></li>
              {/* ATUALIZADO: Link para Notícias */}
              <li><Link to="/noticias" className="hover:text-gray-300">Notícias</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contato</Link></li>
            </ul>
          </div>

          {/* Coluna da Direita: Botão de Menu Mobile ou Espaço Vazio */}
          <div className="justify-self-end flex items-center">
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col items-center space-y-4">
              <li><Link to="/" className="hover:text-gray-300 block py-2" onClick={handleLinkClick}>Início</Link></li>
              <li><Link to="/about" className="hover:text-gray-300 block py-2" onClick={handleLinkClick}>Sobre</Link></li>
              <li><Link to="/services" className="hover:text-gray-300 block py-2" onClick={handleLinkClick}>Serviços</Link></li>
              <li><Link to="/projetos" className="hover:text-gray-300 block py-2" onClick={handleLinkClick}>Projetos</Link></li>
              {/* ATUALIZADO: Link para Notícias */}
              <li><Link to="/noticias" className="hover:text-gray-300 block py-2" onClick={handleLinkClick}>Notícias</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300 block py-2" onClick={handleLinkClick}>Contato</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
