import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../../../PageHeader';
import PageFooter from '../../../PageFooter';
import { Container, BigTextArea } from './styles';
import Button from '../../../Button';

export default function FullScreenViewer({
  inputRef,
  title,
  onClose,
  hidden,
  onBlur,
  onChange,
  readOnly,
  ...rest
}) {
  const bigTextAreaRef = useRef(null);
  useEffect(() => {
    if (inputRef && inputRef.current && inputRef.current.focus) {
      const input = inputRef.current;
      const bigTextArea = bigTextAreaRef.current;
      bigTextArea.value = input.value;
      setTimeout(() => {
        bigTextArea.focus();
        bigTextArea.setSelectionRange(
          bigTextArea.value.length,
          bigTextArea.value.length
        );
      }, 300);
    }
  }, [inputRef, bigTextAreaRef]);
  return (
    <Container onEscapeOutside={onClose}>
      {title && (
        <PageHeader>
          <h2>{title}</h2>
        </PageHeader>
      )}
      <BigTextArea
        ref={bigTextAreaRef}
        hidden={hidden}
        onBlur={onBlur}
        onChange={e => {
          onChange(e);
          inputRef.current.value = bigTextAreaRef.current.value;
        }}
        readOnly={readOnly}
        {...rest}
      />
      <PageFooter>
        <Button onClick={onClose}>Fechar</Button>
      </PageFooter>
    </Container>
  );
}

FullScreenViewer.propTypes = {
  inputRef: PropTypes.shape(),
  title: PropTypes.string,
  name: PropTypes.string,
  onClose: PropTypes.func,
  defaultValue: PropTypes.string,
  hidden: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};
FullScreenViewer.defaultProps = {
  inputRef: null,
  title: '',
  name: '',
  onClose: () => {},
  defaultValue: '',
  hidden: false,
  onBlur: () => {},
  onChange: () => {},
  readOnly: false,
};
