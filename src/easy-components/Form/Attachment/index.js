/* eslint-disable import/no-cycle */
/* eslint-disable no-new-func */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, memo, useMemo, useState } from 'react';
import { useField } from '@unform/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  TiDownload as IconDownload,
  TiUpload as IconUpload,
  TiDelete as IconDelete,
} from 'react-icons/ti';
import { sendData } from '~/store/modules/log/actions';
import { FieldContainer, Title, Input } from '../styles';
import { PanelInput, IconPanel, IconsContainer } from './styles';
import { createSyncFunctionByString } from '~/easy-components/AsyncFunctionString';
import downloadLink from '~/easy-components/Helpers/downloadLink';
import AttachmentModal from '~/components/AttachmentModal';
import TreatError from '~/easy-components/TreatError';
import clientEvent from '~/applications/ClientEventHandler';
import AttachmentService from '~/services/AttachmentService';
import UserField from '../UserField';

function Attachment({
  baseName,
  name,
  label,
  hidden,
  formRef,
  mainFormRef,
  settings,
  labelWidth,
  readOnly,
  ...rest
}) {
  const dispatch = useDispatch();
  const showLog = useSelector(({ log }) => log.isShow);
  const [isUpdate, setIsUpdate] = useState(false);
  const attachModalRef = useRef();
  const linkRef = useRef({
    token: null,
    fileName: null,
    sourcePath: null,
  });

  const attachmentService = new AttachmentService();

  const { fields } = settings || {};
  const selfField =
    (fields
      ? fields.find(f => {
          const fullName = baseName ? `${baseName}.${name}` : name;
          return f.name === fullName;
        })
      : {}) || {};

  const fieldTitle = selfField.title || label;

  const style = selfField.style || {};

  const inputRef = useRef(null);

  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  const splitFileName = fileName => {
    if (fileName) {
      const idx = fileName.lastIndexOf('\\');

      const FileName = fileName.substring(idx + 1, fileName.length);
      return FileName;
    }
    return '';
  };

  const splitSourcePath = fileName => {
    const idx = fileName.lastIndexOf('\\');

    const pathSource = fileName.substring(0, idx + 1);
    return pathSource;
  };

  const openAttachmentModal = () => {
    if (attachModalRef.current && attachModalRef.current) {
      attachModalRef.current.show({
        title: 'Anexo',
        message: 'Clique ou arraste um arquivo.',
        onUpload: files => {
          const fileData = files[0];

          attachmentService
            .uploadFile({ fileData })
            .then(
              async ({ token, sourcePath }) => {
                const eventParams = {
                  fileName: fileData.name,
                  formRef,
                  mainFormRef,
                  settings: {
                    ...settings,
                    ...selfField,
                  },
                };
                await clientEvent({
                  run: 'before',
                  params: eventParams,
                  eventName: 'onUpload',
                });
                formRef.current.setFieldValue(fieldName, fileData.name);
                linkRef.current = {
                  token,
                  fileName: fileData.name,
                  sourcePath,
                };
                await clientEvent({
                  run: 'after',
                  params: eventParams,
                  eventName: 'onUpload',
                });
              },
              async err => {
                const eventParams = {
                  error: err,
                  fileName: fileData.name,
                  formRef,
                  mainFormRef,
                  settings: {
                    ...settings,
                    ...selfField,
                  },
                };
                await clientEvent({
                  run: 'before',
                  params: eventParams,
                  eventName: 'onError',
                });
                TreatError.showError(err);
              }
            )
            .catch(err => {
              TreatError.showError(err);
            })
            .finally(() => {
              attachModalRef.current.close();
            });
        },
        isReadOnly: false,
      });
    }
  };

  const onDownload = async () => {
    let { token, fileName } = linkRef.current;
    fileName = fileName || splitFileName(defaultValue);

    if (!token) {
      const sourcePath = splitSourcePath(defaultValue);

      token = await attachmentService.getToken({ fileName, sourcePath });
    }
    const url = `files/${token}/${fileName}`;
    downloadLink({ url, fileName });
  };

  const onDelete = async () => {
    const eventParams = {
      formRef,
      mainFormRef,
      settings: {
        ...settings,
        ...selfField,
      },
    };
    await clientEvent({
      run: 'before',
      params: eventParams,
      eventName: 'onDelete',
    });

    // TODO: interceptação - (chamar rotina para deletar no servidor)
    // const sourcePath = defaultValue
    //   ? splitSourcePath(defaultValue)
    //   : linkRef.current.sourcePath;
    // const fileName = defaultValue
    //   ? splitFileName(defaultValue)
    //   : linkRef.current.fileName;

    setIsUpdate(false);
    formRef.current.setFieldValue(fieldName, '');

    await clientEvent({
      run: 'after',
      params: eventParams,
      eventName: 'onDelete',
    });
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      getValue: el => {
        return el.value === '' ? null : el.value;
      },
      setValue: (el, v) => {
        el.value = v;
        setIsUpdate(!!v);
      },
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (showLog)
      inputRef.current.onmouseover = () =>
        dispatch(
          sendData({ baseName, name: fieldName, value: inputRef.current.value })
        );
    if (inputRef.current && inputRef.current.value) {
      setIsUpdate(!!inputRef.current.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isHidden = useMemo(() => {
    if (selfField) {
      if (typeof selfField.hidden === 'boolean') {
        return !!(selfField.hidden || hidden);
      }

      if (typeof selfField.hidden === 'string') {
        const hiddenFunction = createSyncFunctionByString({
          functionString: selfField.hidden,
        });
        return !!(hiddenFunction({ formRef, selfField }) || hidden);
      }
    }

    return !!hidden;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden, selfField]);

  return (
    <>
      <FieldContainer hidden={isHidden} readOnly={readOnly}>
        {fieldTitle && (
          <Title
            labelWidth={
              (selfField && selfField.labelWidth) || labelWidth || 130
            }
          >
            <div className="title">{fieldTitle}</div>{' '}
            {error && <div className="error">{error}</div>}
          </Title>
        )}
        <PanelInput>
          <div>
            <Input
              ref={inputRef}
              id={fieldName}
              defaultValue={splitFileName(defaultValue)}
              hidden={hidden}
              style={style}
              {...rest}
              readOnly
            />

            {error && !hidden && <span style={{ color: '#f00' }}>{error}</span>}
            {isUpdate && (
              <IconsContainer>
                <IconPanel onClick={() => onDownload()}>
                  <IconDownload size={14} color="#3B8FB1" />
                </IconPanel>
                {!readOnly && (
                  <IconPanel onClick={() => onDelete()}>
                    <IconDelete size={18} color="#ff9191" />
                  </IconPanel>
                )}
              </IconsContainer>
            )}

            {!isUpdate && !readOnly && (
              <IconsContainer>
                <IconPanel onClick={() => openAttachmentModal()}>
                  <IconUpload size={14} color="#3B8FB1" />
                </IconPanel>
              </IconsContainer>
            )}
          </div>
        </PanelInput>
      </FieldContainer>

      <UserField
        baseName={baseName}
        fieldName={fieldName}
        formRef={formRef}
        mainFormRef={mainFormRef}
        settings={settings}
        readOnly={readOnly}
        labelWidth={(selfField && selfField.labelWidth) || labelWidth || 130}
      />

      <AttachmentModal ref={attachModalRef} />
    </>
  );
}

export default memo(Attachment);
