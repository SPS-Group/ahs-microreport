import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  background-color: #fff;
  flex-direction: column;
  display: flex;
  overflow: auto;
`;

export const Line = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
`;

export const Title = styled.div`
  min-width: 35%;
  font-size: 0.8rem;
  color: #8197a5;
  font-weight: 600;
`;

export const Header = styled.header`
  height: 44px;
  background-color: #496774;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
    justify-content: flex-start !important;
    border-bottom: 1px solid #f0f0f0;
    align-items: center;
    color: #444 !important;
    background-color: #fff !important;

    > svg {
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
