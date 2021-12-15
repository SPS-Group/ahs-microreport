import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import { DropContainer, UploadMessage } from './styles';

function Upload({ message, accept, onUpload, isReadOnly, isSetFileName }) {
  const [displayText, setDisplayText] = useState('');

  function renderDragMessage(isDragActive, isDragReject) {
    if (!isDragActive) return <UploadMessage>{displayText}</UploadMessage>;

    if (isDragReject)
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>;
  }

  useEffect(() => {
    setDisplayText(message);
  }, [message]);

  return (
    <section>
      {!isReadOnly && (
        <Dropzone
          accept={accept}
          onDropAccepted={files => {
            if (isSetFileName) {
              const file = files[0];
              setDisplayText(file.name);
            }
            onUpload(files);
          }}
          maxFiles={1}
        >
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
            return (
              <DropContainer
                {...getRootProps()}
                isDragActive={isDragActive}
                isDragReject={isDragReject}
              >
                <input {...getInputProps()} />
                {renderDragMessage(isDragActive, isDragReject)}
              </DropContainer>
            );
          }}
        </Dropzone>
      )}
    </section>
  );
}

Upload.propTypes = {
  message: PropTypes.string,
  accept: PropTypes.string,
  isReadOnly: PropTypes.bool,
  isSetFileName: PropTypes.bool,
  onUpload: PropTypes.func.isRequired,
  file: PropTypes.shape({
    fileName: PropTypes.string,
    file: PropTypes.shape(),
  }),
};

Upload.defaultProps = {
  message: 'Selecione o arquivo',
  accept: null,
  isReadOnly: false,
  file: {
    fileName: null,
    file: null,
  },
  isSetFileName: true,
  // accept: 'image/*',
};

export default Upload;
