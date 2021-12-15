import React, { useRef, useState, useCallback } from 'react';
import JsonTable from '~/easy-components/JsonTable';
import Loading from '~/easy-components/Loading';
import Login from '~/Components/Login';

interface Scopes {
  footerButtons?: object;
  row?: object;
}

interface Props {
  loggedIn?: boolean;
  data: Array<any>;
  columns: Array<any>;
  settings?: string;
  scopes?: Scopes;
  loading?: void;
  loadData?(): Promise<any[]>;
  // eslint-disable-next-line no-unused-vars
  onLogin?: (username: string, password: string) => void;
  loginErrorMessage?: string;
}

const ReportPage: React.FC<Props> = function ReportPage({
  loggedIn,
  settings,
  data,
  columns,
  scopes,
  loading,
  onLogin,
  loginErrorMessage,
  loadData,
}: Props) {
  const [isLoading, showLoading] = useState(!!loading);
  const dataRef = useRef<Array<any>>(data);
  const treatedSettings = settings
    ? settings.replace(/\t/g, ' ').replace(/\n/g, ' ')
    : '{}';

  const reportSettings = JSON.parse(treatedSettings);

  const callLoadData = useCallback(async () => {
    showLoading(true);
    let newData: Array<any> = [];

    if (loadData) {
      newData = await loadData();
    }

    dataRef.current = newData;

    showLoading(false);
    return newData;
  }, [loadData]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <div style={{ height: '100%' }}>
      {loggedIn ? (
        <JsonTable
          data={dataRef.current}
          columns={columns}
          scopes={scopes}
          reportSettings={reportSettings}
          showLoading={showLoading}
          onReloadData={callLoadData}
        />
      ) : (
        <Login
          onLogin={(username: string, password: string) => {
            if (onLogin) {
              onLogin(username, password);
            }
          }}
          loginErrorMessage={loginErrorMessage}
        />
      )}
      <div id="modal" />
      <Loading isLoading={isLoading} />
    </div>
  );
};

export default ReportPage;
