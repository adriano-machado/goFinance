import React from 'react';

import { Container, InteractiveLink } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <InteractiveLink
          active={Number(window.location.pathname === '/')}
          to="/"
        >
          Listagem
        </InteractiveLink>
        <InteractiveLink
          active={Number(window.location.pathname === '/import')}
          to="/import"
        >
          Importar
        </InteractiveLink>
      </nav>
    </header>
  </Container>
);

export default Header;
