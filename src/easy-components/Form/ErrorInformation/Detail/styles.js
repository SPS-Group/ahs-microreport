import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import colors from '~/styles/colors';

export const Container = styled.div`
  background-color: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  min-width: 400px;

  ${(props) =>
    props.maxWidth &&
    css`
      max-width: ${props.maxWidth};
    `}
`;

export const Header = styled.header`
  height: 44px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ededed;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 30px;
  font-weight: bold;
`;

export const HeaderRight = styled(Header)`
  justify-content: flex-end;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;

  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: linear;

  &:hover {
    background-color: ${lighten(0.55, colors.secundary)};
  }

  :active {
    background-color: ${lighten(0.6, colors.secundary)};
  }
`;

export const Body = styled.div`
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export const Informations = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

export const Footer = styled.div`
  height: 50px;
  background-color: #f9f9f9;
  border-top: 1px solid #f0f0f0;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  padding: 0 10px;

  & > button {
    margin-left: 10px;
  }
`;

export const Error = styled.div`
  padding: 15px;
  border: 1px solid #ededed;
  color: #444;
  background-color: #f5f5f5;
`;

export const ListErrors = styled.div`
  background-color: #f9f9f9;
`;

export const Title = styled.div`
  padding: 10px;
  color: #777;
  text-align: right;
`;

export const List = styled.div``;

export const LineError = styled.div`
  color: #777;
  padding: 0 20px 20px;
`;

export const LineNumber = styled.div`
  padding: 10px;
  text-align: right;
`;

export const Line = styled.div`
  background-color: #f9f9f9;
`;
