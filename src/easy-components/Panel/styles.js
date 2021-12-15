import styled from 'styled-components';

export const Container = styled.div`
  min-width: ${props => `${props.width}` || '300px'};
  max-width: ${props => `${props.width}` || '100%'};
  display: flex;
  flex-direction: column;
  transition: position 0.5s;
  margin: 0 10px;

  & > div {
    margin-bottom: 2px;

    span {
      width: ${props => `${props.labelWidth}` || '100%'};
    }
  }

  @media (max-width: 500px) {
    width: 100% !important;
    //max-width: 100%;
    min-width: 100% !important;
    margin: 0 10px 0px 0px;

    & > div {
      margin-bottom: 0;
    }

    & > h1 {
      padding: 10px 15px;
    }
  }
`;
