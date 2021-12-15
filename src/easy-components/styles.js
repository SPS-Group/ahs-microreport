/* eslint-disable no-shadow */
import styled, { css } from 'styled-components';

export const colors = {
  fontColor: '#728692',
  tabColorActive: '#449dc1',
  tabColor: '#a7cee7',
  main: '#449dc1',
  red: '#ff9191',
};

export const Container = styled.div`
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  flex-direction: row;

  ${(props) =>
    props.flexible &&
    css`
      justify-content: center;
      align-items: center;
      flex: 1;
    `}

  ${(props) =>
    !props.disableRenderMobile &&
    css`
      @media (max-width: 500px) {
        flex-direction: column;
        border-bottom: ${(props) =>
          props.hideLine ? '0px' : '1px solid #f0f0f0'};
        background-color: #fff;
        padding: 15px;

        ${(props) =>
          props.error &&
          css`
            border-bottom: 2px solid #992222;
          `}

        :focus-within {
          border-bottom: 1px solid #9cc3d4;
        }

        ${(props) =>
          props.readOnly &&
          css`
            background-color: #f9f9f9 !important;
          `}
      }
    `} 
  

  input {
    font-size: 1.2rem;
  }
`;

export const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1rem;
  width: ${(props) =>
    props.labelWidth ? `${props.labelWidth}px !important` : '130px'};
  min-width: ${(props) =>
    props.labelWidth ? `${props.labelWidth}px !important` : '130px'};
  color: #888;
  /*border-bottom: 1px solid #ddd;*/
  border-bottom: ${(props) => (props.hideLine ? '0px' : '1px solid #ddd')};
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    font-size: 1rem;
  }

  @media (max-width: 500px) {
    flex-direction: row;
    justify-content: space-between;
    font-size: 1rem;
  }

  .title {
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    > span {
      width: auto;
      display: flex;
      align-items: center;
    }
  }
  .error {
    padding: 5px 0px;
    color: #ef3434;
    font-size: 0.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media (max-width: 500px) {
      font-size: 0.75rem;
      padding: 0;
    }
  }

  & > div {
    text-align: left;
  }

  @media (max-width: 500px) {
    font-size: 0.8rem;
    border-bottom: none;
    width: 100% !important;
    margin-bottom: 5px;
  }
`;
