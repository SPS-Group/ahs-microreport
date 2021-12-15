import styled from 'styled-components';

export const Container = styled.div`
  color: #444;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .popup-content {
    width: 300px !important;
  }
`;

export const Content = styled.div`
  width: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

export const Menus = styled.div`
  display: flex;
  flex-direction: column;

  max-height: 300px;
  overflow: auto;
`;

export const Item = styled.div`
  padding: 10px;
  margin-right: 2px;
  color: #333;
  display: ${props => (props.visible ? 'flex' : 'none')};
  opacity: ${props => (props.disabled ? '0.5' : '1')};

  flex-direction: row;
  align-items: center;

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    background-color: #f7f7f7;
  }
`;

export const ItemIcon = styled.div`
  display: flex;
  min-width: 20px;
  margin-right: 10px;
  flex-direction: row;
  align-items: center;
`;
