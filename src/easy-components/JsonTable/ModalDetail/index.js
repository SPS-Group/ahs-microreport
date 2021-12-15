/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, {
  useContext,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from 'react';
import { FaEllipsisV as MenuIcon } from 'react-icons/fa';
import Button from '~/easy-components/Button';
import ModalHandle from '~/easy-components/ModalHandle';
import SwipeModalButtons from '../SwipeModalButtons';
import getCellText from '../Helpers/getCellText';

import { Container, Line, Title, Header, Body, Footer } from './styles';

import { PageContext } from '../index';

function Detail({ onRefresh, settings }, ref) {
  const modalRef = useRef();

  const [state, setState] = useState({
    columns: [],
    data: {},
    isIconMenuVisible: false,
  });

  const { swipeButtonsSettings, modalDetailButtonsRef } =
    useContext(PageContext);

  useImperativeHandle(ref, () => ({
    open: ({ data, columns, settings: pageSettings }) => {
      const buttons = swipeButtonsSettings({ rowData: data });

      const actionsButtons = [...buttons.rightButtons, ...buttons.leftButtons];

      setState({
        ...state,
        data,
        columns,
        settings: pageSettings,
        buttons: actionsButtons,
        isIconMenuVisible: actionsButtons.length > 0,
      });

      modalRef.current.handleOpen();
    },
    close: () => {
      if (modalDetailButtonsRef.current) modalDetailButtonsRef.current.close();

      modalRef.current.handleClose();
    },
  }));

  return (
    <ModalHandle ref={modalRef} direction="right">
      <Container>
        <Header>
          Detalhes
          {state.isIconMenuVisible && (
            <MenuIcon
              color="#fff"
              size={18}
              onClick={() => {
                modalDetailButtonsRef.current.open({ buttons: state.buttons });
              }}
            />
          )}
        </Header>
        <Body>
          {state.columns
            .filter((c) => {
              if (c.settings && c.settings.type === 'button') {
                return false;
              }

              return true;
            })
            .map((column) => {
              const value = state.data[column.key];
              const fieldCellText = getCellText({
                column,
                value,
                onRefresh,
                rowData: state.data,
                settings,
                isModal: true,
              });
              return (
                <Line key={column.key}>
                  <Title>{column.title}</Title>
                  {fieldCellText}
                </Line>
              );
            })}
        </Body>
        <Footer>
          <Button onClick={() => modalRef.current.handleClose()}>Fechar</Button>
        </Footer>
      </Container>
      <SwipeModalButtons ref={modalDetailButtonsRef} />
    </ModalHandle>
  );
}

export default forwardRef(Detail);
