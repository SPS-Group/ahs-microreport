import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: #777;
`;

export const Panel = styled.div`
  flex: 1;
  display: ${props => (props.isShow ? 'flex' : 'none')};
  flex-direction: row;
  padding: 20px 30px 10px 30px;

  ${props =>
    props.height &&
    css`
      height: ${props.height} !important;

      @media (max-width: 500px) {
        height: auto !important;
      }
    `}

  & > img {
    margin-right: 10px;
  }
`;

export const Image = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  flex: 1;
`;

export const ContentAttributes = styled.div`
  margin-left: 10px;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  /* flex: 1; */
`;

export const Informations = styled.div`
  margin-right: 10px;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Attribute = styled.div`
  margin: 2px 0px;
  text-overflow: ellipsis;
  overflow: hidden;
  /* white-space: nowrap;*/
  text-align: right;
`;

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

export const Description = styled.div`
  line-height: 20px;
`;

export const HiderShow = styled.div`
  height: 2px;
  background-color: #e8e8e8;
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 1;

  > div {
    width: 30px;
    height: 30px;
    background-color: #5d7a89;
    border-radius: 50%;
    border: 2px solid #e8e8e8;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 500px) {
    display: flex;
  }
`;
