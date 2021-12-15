import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background: #e9edef;
  width: 400px;
  max-height: 60vh;
  flex-direction: column;

  @media (max-width: 500px) {
    max-height: 100vh;
    width: 100%;
    flex: 1;
  }
`;

export const Content = styled.div`
  flex: 1;
  background: #e9edef;
`;

export const AcronymList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background: #fff;
  color: #333;
  width: 100%;
  margin-bottom: 1px;
  padding: 15px;

  cursor: pointer;

  h1 {
    font-size: 0.9rem;
    font-weight: normal;
    color: #777;
  }

  span {
    line-height: 16px;
  }

  &:hover {
    cursor: pointer;
    background: #deeff6;
  }
`;
