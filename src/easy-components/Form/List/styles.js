import styled, { css } from 'styled-components';
import { lighten, transparentize } from 'polished';
import colors from '~/styles/colors';

export const Container = styled.div`
  background-color: #e9edef;
  height: 100%;
  flex: 1;
  position: relative;

  display: flex;
  flex-direction: column;
  overflow: auto;

  > form {
    height: 100%;
  }

  header {
    justify-content: space-between;
    display: flex;
    padding: 10px 20px;
    align-items: baseline;
    align-items: flex-end;
    background-color: #e9edef;

    .header {
      font-weight: 500;
      color: ${colors.fieldLabelColor};
      display: flex;
      height: 30px;
      align-items: center;
    }

    > div {
      flex-direction: row;
      display: flex;
    }

    button {
      border: none;
      background: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const Items = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-top: 4px solid #f0f0f0;

  overflow: auto;
`;

export const TitleContent = styled.div`
  padding: 20px 30px;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
  background-color: #fcfcfc;
  color: #555;
  font-size: 0.9rem;
`;

export const ErrorInfo = styled.div`
  color: #f36363;
  padding: 5px 10px;
  text-align: center;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: linear;
  /* background-color: ${props => props.backgroundColor}; */
  /* padding-left: 10px; */

  &:hover {
    cursor: pointer;
    /* background-color: ${transparentize(2, colors.secundary)} !important; */
  }

  /* :active {
    background-color: ${lighten(0.6, colors.secundary)};
  } */

  ${props =>
    props.withError &&
    css`
      border: 2px solid #f36363;
    `}
`;

export const Header = styled.header`
  height: 44px;
  background-color: #496774 !important;
  color: #fff;
  /* border-bottom: 1px solid #f0f0f0;*/
  display: flex;
  flex-direction: row;
  justify-content: flex-start !important;
  align-items: center !important;
  padding: 0 30px;
  font-weight: bold;
`;

export const Body = styled.div`
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export const Footer = styled.div`
  height: 50px;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  padding: 0 10px;

  > div {
    flex: 1;
    color: #555;
    font-size: 0.9rem;
    text-align: right;
  }

  & > button {
    margin-left: 10px;
  }
`;

export const Error = styled.div`
  height: 30px;
  color: #992222;
  padding: 10px;
  font-size: 0.9rem;
  text-align: center;
`;

export const ErrorDetail = styled.div`
  padding: 6px 20px;
  background-color: rgba(200, 20, 20, 0.1);
  color: #992222;
`;
