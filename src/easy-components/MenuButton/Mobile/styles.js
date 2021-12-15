import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background-color: #ffffff;
  height: 100%;
`;

export const ItemMobile = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: ${props => (props.visible ? 'block' : 'none !important')};
  opacity: ${props => (props.disabled ? '0.5' : '1')};
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    margin-right: 15px;
  }
`;

export const Content = styled.div`
  overflow: auto;
  flex: 1;
`;

export const Footer = styled.div`
  height: 44px;
  background-color: #f5f5f5;
  border-top: 1px solid #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 30px;
`;

export const Title = styled.div`
  color: #444;

  @media (max-width: 500px) {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
