import styled from 'styled-components';
import colors from '../../styles/colors';

export const MapContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 500px;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  margin-top: ${(props) => props.mt + 'px'};
  margin-bottom: ${(props) => props.mb + 'px'};

  & + & {
    margin-top: 15px;
  }
`;

export const Divider = styled.hr`
  width: 100%;
  height: 1px;
  border: 0;
  background: ${colors.grey2};
`;

export const CentralizeButton = styled.button`
  position: absolute;
  display: flex;
  top: 10px;
  right: 10px;
  z-index: 1;
`;
