/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

import Modal from '~/easy-components/Modal';
import Form from '~/easy-components/Form';
import HeaderPage from '~/easy-components/HeaderPage';
import FooterPage from '~/easy-components/FooterPage';
import FlexSpace from '~/easy-components/FlexSpace';
import Button from '~/easy-components/Button';
import Panel from '~/easy-components/Panel';
import ColumnLayout from '~/easy-components/ColumnLayout';
import Field from '~/easy-components/Form/UserField/Field';
import colors from '~/styles/colors';

import { Container, Content } from './styles';

function AuxFilter({ fields, onConfirm }, ref) {
  const formRef = useRef();

  const [state, setState] = useState({
    isShow: false,
    params: {},
    errors: {},
  });

  function onClose(e) {
    e.stopPropagation();
    e.preventDefault();

    setState({
      ...state,
      isShow: false,
    });
  }

  function handlerConfirm(e) {
    e.stopPropagation();
    e.preventDefault();

    setState({
      isShow: false,
    });

    const params = formRef.current.getData();

    onConfirm(params);
  }

  function onClearFilter() {
    setState({
      ...state,
      params: {},
      isShow: false,
    });

    onConfirm(null);
  }

  useImperativeHandle(ref, () => {
    return {
      show: params => {
        setState({
          ...state,
          params,
          isShow: true,
        });
      },
      hide: () => {
        setState({
          ...state,
          isShow: false,
        });
      },
    };
  });

  return (
    <Modal isOpened={state.isShow}>
      <Container>
        <HeaderPage
          backgroundColor={colors.headerBg}
          color={colors.headerTitle}
        >
          Filtros
        </HeaderPage>
        <Content>
          <Form ref={formRef} data={state.params || {}} errors={state.errors}>
            <ColumnLayout>
              <Panel width="330px">
                {fields.map(field => {
                  return (
                    <Field
                      key={`${field.name}`}
                      target={field}
                      formRef={formRef}
                    />
                  );
                })}
              </Panel>
            </ColumnLayout>
          </Form>
        </Content>
        <FooterPage>
          <Button type="button" onClick={onClearFilter}>
            Remover Filtros
          </Button>
          <FlexSpace />
          <Button
            buttonType="Emphasized"
            type="button"
            onClick={handlerConfirm}
          >
            Confirmar
          </Button>
          <Button type="button" onClick={onClose}>
            Fechar
          </Button>
        </FooterPage>
      </Container>
    </Modal>
  );
}

export default forwardRef(AuxFilter);
