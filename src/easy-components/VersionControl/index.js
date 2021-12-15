/* eslint-disable no-restricted-syntax */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable func-names */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import packageJson from '~/../package.json';

import { Container, LoadIcon } from './styles';
import colors from '~/styles/colors';

function VersionControl({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const refreshCacheAndReload = () => {
    alert('Nova versão foi encontrada. A aplicação será atualizada!');

    if (caches) {
      // Service worker cache should be cleared with caches.delete()
      caches.keys().then(names => {
        for (const name of names) {
          caches.delete(name);
        }
      });
    }
    // delete browser cache and hard reload
    window.location.reload(true);
  };

  const checkVersion = useCallback(async () => {
    setIsLoading(true);

    fetch('/meta.json')
      .then(response => response.json())
      .then(meta => {
        const latestVersion = meta.last_updated;
        const currentVersion = packageJson.last_updated;

        if (latestVersion !== currentVersion) {
          refreshCacheAndReload();
        } else {
          setIsLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    checkVersion();
  }, [checkVersion]);

  return (
    <>
      {isLoading ? (
        <Container>
          <LoadIcon>
            <AiOutlineLoading size={40} color={colors.secundary} />
          </LoadIcon>
          <h2>Aguarde</h2>
          <h1>Verificando atualizações sistema</h1>
        </Container>
      ) : (
        children
      )}
    </>
  );
}

export default VersionControl;
