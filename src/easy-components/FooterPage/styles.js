import styled from 'styled-components';
//footer page
export const Container = styled.div`
  width: 100%;
  height: 44px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px;

  @media (max-width: 500px) {
    background-color: #f7f7f7;
  }

  button:not(:first-of-type) {
    margin-left: 10px;
  }
`;
