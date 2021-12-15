import styled from 'styled-components';
import modal from 'react-escape-outside';

export const Container = styled(modal)`
  background-color: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 80vh;
  min-width: 450px;

  @media (max-width: 500px) {
    height: 100%;
    min-width: 100%;
  }
`;

export const SearchPanel = styled.div`
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  background-color: #fff;

  & > div {
    border: none;
  }

  svg {
    margin-left: 5px;
  }

  * {
    border: none !important;
  }

  &:focus-within {
    border-bottom: 2px solid #5d7a89;
  }

  border-bottom {
    border-bottom: 2px solid #333;
  }

  input {
    border: none !important;
  }
`;

export const ButtonIcon = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  background-color: #f0f0f0;

  @media (max-width: 500px) {
    /* padding: 10px; */
  }
`;

export const ItemElement = styled.div`
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;

  &:hover {
    cursor: pointer;
    background-color: #deeff6;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #555;
`;

export const InputSearch = styled.input`
  width: 100%;
`;

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;

  @media (max-width: 500px) {
    flex-direction: column-reverse;
  }
`;
