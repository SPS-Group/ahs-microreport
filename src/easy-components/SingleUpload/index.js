/* eslint-disable react/prop-types */
import React from 'react';
import { IoMdClose as DeleteIcon } from 'react-icons/io';
import Upload from '~/easy-components/Upload';
import Icon from '~/easy-components/Icon';
import { Container, FileInfo } from './styles';

function SingleUpload({
  fileInfo,
  accept,
  message,
  onUpload,
  onRemove,
  isReadOnly,
}) {
  return (
    <Container>
      {fileInfo.fileName && (
        <FileInfo>
          <div>
            <Icon name="HiOutlineDocumentReport" size={28} color="#555" />
            <h1>{fileInfo.fileName}</h1>
            <button type="button" onClick={onRemove}>
              <DeleteIcon size={20} color="#e57878" />
            </button>
          </div>
        </FileInfo>
      )}
      <Upload
        message={message}
        accept={accept}
        onUpload={onUpload}
        isReadOnly={isReadOnly}
      />
    </Container>
  );
}

export default SingleUpload;
