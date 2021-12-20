import React, { useState } from 'react';
import ReportPage from '~/Components/ReportPage';
import rawSettings from '~/tests/assets/report_page_settings';

interface DataI {
  id: number;
  name: string;
  surname: string;
  view: string;
  supply: number;
}

const data: DataI[] = [
  { id: 1, name: 'John', surname: 'Mayer', view: 'Y', supply: 1 },
];

const App: React.FC = function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const scopes = {
    footerButtons: {
      treatError: (err: Error) => alert(err),
      executeScalar: () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ id: 1, name: 'Scalars' }), 3000);
        }),
      serviceLayer: () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ id: 1, name: 'Layer' }), 3000);
        }),
    },
    row: {
      showPage: () => alert('Mudei de página'),
    },
  };
  function loadData(): Promise<DataI[]> {
    return new Promise<DataI[]>((resolve) => {
      setTimeout(() => {
        data.push({
          id: 2,
          name: 'John',
          surname: 'Silva',
          view: 'Y',
          supply: 1,
        });
        resolve(data);
      }, 3000);
    });
  }
  return (
    <ReportPage
      loggedIn={loggedIn}
      onLogin={(username, password) => {
        setLoggedIn(username === 'a' && password === 'a');
      }}
      data={data}
      columns={[
        { key: 'selection', title: 'Select', settings: { type: 'selection' } },
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'Nome' },
        {
          key: 'view',
          title: 'View',
          settings: {
            type: 'button',
            onClick: 'alert(scope.line.surname)',
            title: 'a',
          },
        },
      ]}
      settings={rawSettings}
      scopes={scopes}
      // eslint-disable-next-line react/jsx-no-bind
      loadData={loadData}
    />
  );
};

export default App;
