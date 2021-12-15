/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FaPlus as AddIcon } from 'react-icons/fa';
import Modal from '../../../Modal';

// eslint-disable-next-line import/no-cycle
import Detail from './Detail';

import { Container } from './styles';

export default function MobileView({
  text,
  fixedData,
  method,
  renderItem,
  readOnly,
  onConfirm,
  title,
  children,
  propFieldLabel,
  propFieldValue,
  selValues,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {readOnly ? (
        <>{children}</>
      ) : (
        <Container
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          {children}
          <AddIcon size={12} color="#333" />
          <Modal isOpened={isOpen}>
            <Detail
              propFieldLabel={propFieldLabel}
              propFieldValue={propFieldValue}
              selValues={selValues}
              title={title}
              text={text}
              onClose={() => setIsOpen(false)}
              method={method}
              fixedData={fixedData}
              renderItem={renderItem}
              onConfirm={value => {
                setIsOpen(false);
                onConfirm(value);
              }}
            />
          </Modal>
        </Container>
      )}
    </>
  );
}
