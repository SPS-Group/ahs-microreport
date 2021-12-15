import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  line-height: 20px;
  border-bottom: 1px solid #f0f0f0;

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #aaa;
    margin-bottom: 2px;
  }
`;
