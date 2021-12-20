import { render, screen } from '@testing-library/react';
import ReportPage from './index';
import settings from '~/tests/assets/report_page_settings';

const parsedSettings = settings.replace(/\t/g, ' ').replace(/\n/g, ' ');
render(
  <ReportPage
    loggedIn
    data={[{id: 1, 'name': 'John',}]}
    columns={[{key: 'id', title: 'ID'}, {key: 'name', title: 'NOME'}]}
    settings={parsedSettings}
  />
);

test('should render the table', async () => {
  const table = await screen.findByTestId('json-table');
  expect(table).toBeInTheDocument();
});
