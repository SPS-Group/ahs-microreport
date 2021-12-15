/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Modal from '../../../Modal';
import LinkIcon from '../../../LinkIcon';

// eslint-disable-next-line import/no-cycle
import Detail from './Detail';

import { Container, Text } from './styles';

export default function MobileView({
  text,
  fixedData,
  method,
  renderItem,
  readOnly,
  onConfirm,
  title,
  showLink,
  onLink,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {readOnly ? (
        <>
          {showLink && <LinkIcon onClick={onLink} />}
          <Text readOnly>{text}</Text>
        </>
      ) : (
        <Container
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          {showLink && text && <LinkIcon onClick={onLink} />}
          <Text>{text}</Text>
          <MdKeyboardArrowRight size={22} color="#333" />
          <Modal isOpened={isOpen}>
            <Detail
              title={title}
              text={text}
              onClose={() => setIsOpen(false)}
              method={method}
              fixedData={fixedData}
              renderItem={renderItem}
              onConfirm={value => {
                onConfirm(value);
                setIsOpen(false);
              }}
            />
          </Modal>
        </Container>
      )}
    </>
  );
}
