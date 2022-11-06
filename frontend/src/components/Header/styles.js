import styled, { css } from 'styled-components';

import { Link } from 'react-router-dom';

import colors from '../../styles/colors';

export const Container = styled.header`
  width: 100%;
  height: 64px;
  background: #fff;
  box-shadow: 0 0 20px rgba(125, 64, 231, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  position: fixed;
  z-index: 4;

  button {
    border: none;
    background: none;
    color: ${colors.warning1};
    font-weight: bold;
    font-size: 16px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    transition: background 0.2s;
    padding: 5px 10px;
    border-radius: 5px;

    svg {
      width: 20px;
      height: 20px;
      margin-left: 5px;
    }
  }

  button:hover {
    background: ${colors.warning1 + '33'};
  }
`;
