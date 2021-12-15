import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  flex: 1;
  color: #777;
  background-color: ${(props) =>
    props.color ? `${props.color} !important` : `transparent`};

  h3 {
    font-weight: normal;
    font-size: 0.9rem;
    color: #777;
  }
  line-height: 20px;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > div:last-child {
      margin-left: 20px;
    }
  }
`;
