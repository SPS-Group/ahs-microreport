/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { MdFileUpload as UploadIcon } from 'react-icons/md';
import { RiDeleteBin6Line as DeleteIcon } from 'react-icons/ri';
import { Content, Upload } from './styles';
import { FieldContainer, Title } from '../Form/styles';

function ImportFile({ title, onChange, accept = 'image/*' }, ref) {
  const inputRef = useRef();

  const [state, setState] = useState({
    fileName: null,
    isLoading: false,
    base64: null,
    error: null,
  });

  async function onImportFileAndPreview(e) {
    const file = e.target.files[0];

    setState({
      ...state,
      fileName: file.name,
      base64: null,
      isLoading: true,
    });

    const reader = new FileReader();

    reader.onload = () => {
      setState(stateOld => {
        const base64 = reader.result.split(',')[1];

        const newState = {
          ...stateOld,
          base64,
          isLoading: false,
        };

        if (onChange)
          onChange({ fileName: newState.fileName, base64: newState.base64 });

        return newState;
      });
    };

    reader.onerror = error => {
      setState(stateOld => ({
        ...stateOld,
        base64: null,
        isLoading: false,
        error,
      }));
    };

    reader.readAsDataURL(file);
  }

  function onRemove(e) {
    e.stopPropagation();
    setState(stateOld => {
      const newState = {
        ...stateOld,
        fileName: null,
        base64: null,
      };

      if (onChange)
        onChange({ fileName: newState.fileName, base64: newState.base64 });

      return newState;
    });
  }

  useImperativeHandle(ref, () => {
    return {
      setFile: ({ fileName, base64 }) => {
        setState(stateOld => ({
          ...stateOld,
          fileName,
          base64,
        }));
      },
    };
  });

  return (
    <FieldContainer>
      <Title>
        <div className="title">{title}</div>
      </Title>
      <Content>
        <div>
          {state.isLoading && <h2>Carregando {state.fileName}</h2>}
          {state.error && <h3>Erro no arquivo</h3>}
          {state.base64 ? (
            <>
              <h1>{state.fileName}</h1>
              <div className="button" onClick={onRemove}>
                <DeleteIcon size={20} color="#3b8fb1" />
              </div>
            </>
          ) : (
            <h1>Nenhum arquivo</h1>
          )}
        </div>
        {!state.base64 && !state.isLoading && (
          <Upload htmlFor="upload">
            <UploadIcon size={20} color="#3b8fb1" />

            <input
              ref={inputRef}
              type="file"
              id="upload"
              style={{ display: 'none' }}
              accept={accept}
              onChange={onImportFileAndPreview}
            />
          </Upload>
        )}
      </Content>
    </FieldContainer>
  );
}

export default forwardRef(ImportFile);
