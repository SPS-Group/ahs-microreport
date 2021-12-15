/* eslint-disable import/named */
import React, { useEffect, useState, memo, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Form from '~/easy-components/Form';
import Button from '~/easy-components/Button';
import Loading from '~/easy-components/Loading';

import { Container, Header, Body, Footer, ErrorDetail } from '../styles';

function Detail({
  index,
  data,
  onConfirm,
  onClose,
  editPage,
  editPageTitle,
  errors,
  readOnly,
  confirmEnabled,
  validate,
  formRef,
  footerElement,
}) {
  const containerRef = useRef();
  const initialDataLoadedRef = useRef();

  const isGlobalLoading = useSelector(({ loading }) => loading.status);

  // const formRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [isLoading, setLoadingMask] = useState(false);
  const [clickConfirm, setClickConfirm] = useState(false);

  const timeout = useRef();
  const blockClick = useRef(false);

  const loading = useRef(false);

  const [error, setError] = useState(null);

  function onKeydown(e) {
    if (e.keyCode === 27) onClose(false);
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('keydown', onKeydown);
    }

    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.removeEventListener('keydown', onKeydown);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    formRef.current.reset();
    formRef.current.setData(data);
    setFormData(data || {});
    formRef.current.setErrors(errors);
  }, [data, errors, formRef, index]);

  useEffect(() => {
    const dataValues = formRef.current.getData();

    const oldData = {
      ...formData,
      ...dataValues,
    };

    initialDataLoadedRef.current = oldData;
  }, [formData, formRef]);

  async function confirm(newData) {
    const compareData = JSON.stringify(newData);
    const oldData = JSON.stringify(initialDataLoadedRef.current);

    if (compareData !== oldData) {
      const isValid = validate
        ? await validate({ data: newData, pageRef: formRef, setError })
        : true;

      if (isValid) {
        setError(null);
        onConfirm(newData, JSON.parse(oldData));
      } else {
        setLoadingMask(false);
      }
    } else {
      setLoadingMask(false);
      onClose();
    }
  }

  function setIsLoading(status) {
    loading.current = status;
    clearTimeout(timeout.current);
    blockClick.current = false;
    setLoadingMask(status);
  }

  useEffect(() => {
    setIsLoading(isGlobalLoading);
  }, [isGlobalLoading]);

  useEffect(() => {
    if (clickConfirm) {
      setClickConfirm(false);
    }
  }, [clickConfirm]);

  const editPg = useCallback(() => {
    let line = data;

    const dataValues = formRef.current.getData();

    if (JSON.stringify(dataValues) !== '{}') {
      line = dataValues;
    }

    return editPage({
      pageRef: formRef,
      line,
      setIsLoading,
      setError,
      index,
    });
  }, [data, editPage, formRef, index]);

  const footerPg = useCallback(() => {
    let line = data;

    const dataValues = formRef.current ? formRef.current.getData() : {};

    if (JSON.stringify(dataValues) !== '{}') {
      line = dataValues;
    }

    return footerElement({
      pageRef: formRef,
      line,
      setIsLoading,
      setError,
      index,
    });
  }, [data, footerElement, formRef, index]);

  return (
    <Container ref={containerRef}>
      {isLoading && <Loading isLoading />}
      <Form ref={formRef} data={formData}>
        <Header>{editPageTitle}</Header>
        <Body>{formRef.current && editPg()}</Body>
        {error && <ErrorDetail>{error}</ErrorDetail>}
        <Footer>
          {formRef.current && footerPg()}
          {!readOnly ? (
            <>
              <div>
                {isLoading ? 'Aguarde, processando informações...' : ''}
              </div>
              <Button
                disabled={!confirmEnabled || isLoading}
                buttonType="Emphasized"
                type="button"
                onClick={() => {
                  setLoadingMask(true);
                  // Usado quando o algum campo do formulário faz chamada asíncrona.
                  // Isso permite cancelar o evento do clique para que o evento onBlur seja executado
                  if (!blockClick.current) {
                    blockClick.current = true;
                    timeout.current = setTimeout(() => {
                      const values = formRef.current.getData();
                      const newData = {
                        ...formData,
                        ...values,
                      };

                      confirm(newData);
                      blockClick.current = false;
                    }, 200);
                  }
                }}
              >
                Confirmar
              </Button>
              <Button disabled={isLoading} onClick={onClose}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button onClick={onClose}>Fechar</Button>
          )}
        </Footer>
      </Form>
    </Container>
  );
}

Detail.propTypes = {
  data: PropTypes.shape(),
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  editPage: PropTypes.func.isRequired,
  editPageTitle: PropTypes.string.isRequired,
  errors: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
  readOnly: PropTypes.bool,
  confirmEnabled: PropTypes.bool,
  validate: PropTypes.func.isRequired,
  formRef: PropTypes.shape().isRequired,
  index: PropTypes.number,
  footerElement: PropTypes.func,
};

Detail.defaultProps = {
  index: null,
  data: {},
  errors: {},
  readOnly: false,
  confirmEnabled: true,
  footerElement: () => {
    return null;
  },
};

export default memo(Detail);
