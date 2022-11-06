import React, { useState } from 'react';

import { Container } from './styles';

function Footer() {
  return (
    <Container>
      <small>
        Feito com 🤍 por{' '}
        <a
          href="http://github.com/gu-nogueira"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gustavo Nogueira
        </a>
      </small>
    </Container>
  );
}

export default Footer;
