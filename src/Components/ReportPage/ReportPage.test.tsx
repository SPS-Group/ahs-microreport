/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ReportPage from './index';
import settings from '~/tests/assets/report_page_settings';

const parsedSettings = settings.replace(/\t/g, ' ').replace(/\n/g, ' ');
render(
  <ReportPage data={[{ id: 1, name: 'John' }]} settings={parsedSettings} />
);

test('should render the table', async () => {
  const table = await screen.findByTestId('json-table');
  expect(table).toBeInTheDocument();
});
