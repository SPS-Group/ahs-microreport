import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
`;

export const Header = styled.header`
  height: 44px;
  background-color: #496774 !important;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: flex-start !important;
  align-items: center !important;
  padding: 0 30px;
  font-weight: 600;
`;

export const Body = styled.div`
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;

  > div {
    height: auto !important;
    padding: 15px 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    border-bottom: 1px solid #f0f0f0;
    align-items: center;
    color: #444 !important;
    background-color: #fff !important;

    svg {
      color: #777 !important;
      margin-left: 0px !important;
      margin-right: 10px !important;
    }
  }
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
