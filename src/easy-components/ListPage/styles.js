import styled from 'styled-components';

export const Page = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  overflow: auto;
  flex-direction: column;

  @media (max-width: 500px) {
    flex-direction: column-reverse;
  }
`;

export const SearchPanel = styled.div`
  background-color: #496774;
  height: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 10px;
  min-width: 310px;

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
    border-bottom: 1px solid #9cc3d4;
  }

  input {
    border: none !important;
    height: auto !important;
    padding: 10px;
    margin-left: 10px;
    color: #f0f0f0;
    background-color: #ffffff1f;
    border-radius: 10px;

    &::placeholder {
      color: #ccc;
    }
  }

  @media (max-width: 500px) {
    /*border-top: 4px solid #f0f0f0;*/
    height: 50px;
  }
`;

export const SearchPanelContent = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const AuxFilter = styled.div`
  margin-left: 5px;
  &:hover {
    cursor: pointer;
  }
`;

export const Container = styled.div`
  pointer-events: ${props => (props.clickable ? 'all' : 'none')};

  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;

  height: 100%;
  overflow: auto;
  /*border-right: 1px solid #d5d5d5;*/
`;

export const Content = styled.div`
  position: relative;
  background-color: ${props => props.backgroundColor || '#f0f0f0'};
  overflow-y: auto;
  min-height: 0;
  height: 100%;
  flex: 1;
`;

export const Empty = styled.div`
  height: 100%;
  flex: 1;
  color: #888;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Item = styled.div`
  cursor: pointer;
`;

export const Button = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
