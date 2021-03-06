import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Container } from './styles';
import Modal from '~/easy-components/Modal';
import Viewer from './viewer';

function ImageViewer({ src, alt, disableViewer, width, height, ...rest }) {
  // const dataConnectorInfo = useSelector(({ dataConnector }) => dataConnector);

  const [showViewer, setShowViewer] = useState(false);

  function onShowImage(e) {
    if (!disableViewer) {
      e.stopPropagation();
      e.preventDefault();
      setShowViewer(true);
    }
  }

  /* const path = useMemo(() => {
    return src
      ? `${dataConnectorInfo.url}/files/images/${src}`
      : 'data:image/jpeg;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k=';
  }, [dataConnectorInfo.url, src]); */

  const path = src;

  return (
    <Container onClick={onShowImage} width={width} height={height} {...rest}>
      <img src={path} alt={alt} width={width} height={height} />

      <Modal isOpened={showViewer}>
        <Viewer
          imageUrl={path}
          onClose={e => {
            e.stopPropagation();
            e.preventDefault();
            setShowViewer(false);
          }}
        />
      </Modal>
    </Container>
  );
}

ImageViewer.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  disableViewer: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
};

ImageViewer.defaultProps = {
  src: null,
  alt: '',
  disableViewer: false,
  width: '60px',
  height: '60px',
};

export default ImageViewer;
