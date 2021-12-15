/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import {
  HeaderPage,
  Container,
  Title,
  Card,
  Table,
  Column,
} from '~/easy-components';

function Detail({ setSideOpen, isSideOpen }) {
  return (
    <Card height="90%">
      <HeaderPage>
        <MdSearch
          size={22}
          color="#333"
          onClick={() => setSideOpen(!isSideOpen)}
        />
        <Title>Relatório</Title>
      </HeaderPage>
      <Container>
        <Table
          data={[
            {
              CardCode: 'BP0001',
              CardName: 'Lucas Lima',
              Status: 'O',
              Pendent: 'Y',
            },
            {
              CardCode: 'BP0002',
              CardName: 'Monique Trombini',
              Status: 'C',
              Pendent: 'N',
            },
          ]}
        >
          <Column title="Código PN" width="150px" value="CardCode" />
          <Column title="Nome" width="220px" value="CardName" />
          <Column
            title="Status"
            width="100px"
            value="Status"
            renderElement={value => {
              return value === 'O' ? (
                <div style={{ backgroundColor: '#f00', flex: 1 }}>Aberto</div>
              ) : (
                'Fechado'
              );
            }}
          />
          <Column
            title="Pendente"
            width="100px"
            value="Pendent"
            transform={value => {
              return value === 'Y' ? 'Pendente' : 'Normal';
            }}
          />
        </Table>
      </Container>
    </Card>
  );
}

Detail.propTypes = {
  setSideOpen: PropTypes.func.isRequired,
  isSideOpen: PropTypes.bool.isRequired,
};

/*

{Quantity: "120", Unit: "PC", Date: "09/01/2020"}

*/

export default Detail;
