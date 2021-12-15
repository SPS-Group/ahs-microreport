import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  border-bottom: ${props => (props.isBorderBottom ? '1px solid #f0f0f0' : '0')};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px 20px;
  line-height: 20px;
  overflow: auto;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  text-overflow: ellipsis;
  overflow: hidden;

  div {
    font-size: 1rem;
    color: #555;
    font-weight: 500;

    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #888;
  div {
    color: #888;
  }
`;

export const BarColor = styled.div`
  width: 6px;
  display: ${props => (props.color ? 'flex' : 'none')};
  background-color: ${props => props.color};
`;

export const Footer = styled.div`
  background-color: #ff99;
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Selection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
