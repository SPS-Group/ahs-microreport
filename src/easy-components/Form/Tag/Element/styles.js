import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 4px;
  padding: 4px 8px;
  background-color: ${props => (props.hasError ? '#ffecec' : '#e9e9e9')};
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 4px;
  font-size: 0.8rem;
  color: #555;
  height: 24px;
  /* padding-top: 6px; */

  svg {
    margin: 0 !important;
    margin-left: 10px !important;
  }

  &:last-child {
    // margin-bottom: 0px;
  }
`;

export const Remove = styled.span`
  cursor: pointer;
  vertical-align: middle;
`;
