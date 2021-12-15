import styled from "styled-components";

export const Container = styled.div`
  /*position: fixed;
  width: 100%;
  top: 0;
  left: 0;*/
  background-color: ${props => props.backgroundColor};
  height: 44px;
  min-height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  h1 {
    font-size: 1rem;
    transition: width 2s;
  }
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #fff;

  img {
    height: 22px;
    margin-right: 10px;
  }

  svg {
    margin-right: 20px;
  }
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #fff;
  justify-content: space-around;

  svg {
    margin-left: 20px;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  justify-items: center;
  text-align: right;

  h1 {
    font-size: 1.1rem;
    font-weight: normal;
    line-height: 14px;
  }

  h2 {
    font-size: 1rem;
    font-weight: normal;
    color: #ddd;
  }

  div {
    font-weight: normal;

    @media (max-width: 500px) {
      display: none;
    }
  }
`;
