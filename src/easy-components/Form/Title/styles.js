import styled from 'styled-components';
import { colors } from '../styles';

export const Container = styled.div`
  color: ${colors.fieldLabelColor};
  margin-bottom: 20px;
  font-size: 0.9rem;
  padding: 10px 0;
  text-decoration: underline;
  font-style: italic;

  @media (max-width: 500px) {
    margin-left: 15px;
  }
`;
