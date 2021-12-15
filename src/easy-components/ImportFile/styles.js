import styled from 'styled-components';

export const Content = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f7f7f7;
  color: #777;
  flex: 1;
  height: 36px;
  border: 1px solid #fff;

  .button {
    border: none;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    cursor: pointer;
  }

  > div {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;

    > h2,
    h1,
    h3 {
      flex: 1;
      padding: 5px 10px;
      font-weight: normal;
      font-size: 0.9rem;

      width: 1px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

export const Upload = styled.label`
  background-color: #fff;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  cursor: pointer;
`;
