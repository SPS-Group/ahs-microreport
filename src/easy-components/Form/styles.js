/* eslint-disable no-shadow */
import styled, { css } from 'styled-components';
import { Form } from '@unform/web';

export const colors = {
  /* fieldBorder: 'rgba(0,0,0,0.07)', */
  fieldBorder: '#fff',
  fieldLabelColor: '#8197a5',
  fieldColor: '#555',
  fieldFocus: '#9cc3d4',
};

export const sizes = {
  borderRadius: '2px',
  padding: '10px 10px',
};

export const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: ${(props) =>
    props.labelWidth ? `${props.labelWidth}px !important` : '130px'};
  min-width: ${(props) =>
    props.labelWidth ? `${props.labelWidth}px !important` : '130px'};
  color: ${colors.fieldLabelColor};
  border-bottom: ${(props) =>
    props.hideLine ? '0px' : `1px solid ${colors.fieldBorder}`};
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 500px) {
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.9rem;
  }

  .title {
    /* font-size: 0.9rem; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    > span {
      width: auto;
      display: flex;
      align-items: center;
    }
  }
  .error {
    /* padding: 5px 0px; */
    color: #ef3434;
    font-size: 0.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 500px) {
      font-size: 0.8rem;
      padding: 0;
    }
  }

  @media (max-width: 500px) {
    font-size: 0.8rem;
    border-bottom: none;
    width: 100% !important;
    margin-bottom: 5px;
  }

  & > div {
    text-align: left;
  }
`;

export const Container = styled(Form)`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;

  input:disabled,
  textarea:disabled {
    background-color: #f7f7f7;
  }
`;

export const FieldContainer = styled.div`
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  flex-direction: row;

  ${(props) =>
    props.flexible &&
    css`
      justify-content: center;
      align-items: center;
      flex: 1;
    `}

  ${(props) =>
    !props.disableRenderMobile &&
    css`
      @media (max-width: 500px) {
        flex-direction: column;
        border-bottom: ${(props) =>
          props.hideLine ? '0px' : '1px solid #eee'};
        background-color: #fff;
        padding: 15px;

        ${(props) =>
          props.error &&
          css`
            border-bottom: 2px solid #992222;
          `}

        :focus-within {
          border-bottom: 1px solid #a8e2fa;
        }

        ${(props) =>
          props.readOnly &&
          css`
            background-color: #f9f9f9 !important;
          `}
      }
    `} 
  
    @media (max-width: 500px) {
    ${(props) =>
      props.isCheckBox &&
      css`
        margin-bottom: 0;
        flex-direction: row-reverse;
        align-items: center;
        display: flex;
      `}
  }

  input,
  .input-textarea {
    ${(props) =>
      props.flexible &&
      css`
        flex: 1;
      `}

    width: 100%;
    background-color: #fff;
    border: ${(props) =>
      props.hideBorder ? 'none' : `1px solid ${colors.fieldBorder}`};

    padding: ${sizes.padding};
    color: ${colors.fieldColor};
    border-radius: ${sizes.borderRadius};

    &:disabled {
      background-color: #ebebe4;
    }

    &:focus {
      border: 1px solid ${colors.fieldFocus};
    }

    ${(props) =>
      props.readOnly &&
      css`
        background-color: #f5f5f5;
      `}

    ${(props) =>
      props.error &&
      css`
        border: 1px solid #992222;
      `}

    @media (max-width: 500px) {
      border: 0;

      &:focus {
        border: 0 !important;
      }
    }

    &::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }

    ${(props) =>
      props.error &&
      css`
        border: 1px solid #992222;
      `}

    ${(props) =>
      props.readOnly &&
      css`
        background-color: #f5f5f5;
      `}

    @media (max-width: 500px) {
      background-color: transparent !important ;
      border: none !important;
    }
  }

  .input-textarea {
    resize: none;
    font-size: 0.9rem;
  }

  .input-textarea::-webkit-scrollbar {
    display: none;
  }

  .input-textarea {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export const Input = styled.input``;

export const UpdateIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 4px;
  margin-left: 5px;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

export const PanelInput = styled.div`
  position: relative;
  flex: 1;
  border-radius: ${sizes.borderRadius};

  > div {
    flex: 1;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-radius: ${sizes.borderRadius};

    border: ${(props) =>
      props.hideBorder ? 'none' : `1px solid ${colors.fieldBorder}`} !important;

    svg {
      margin: 5px;
    }

    input,
    .input-textarea {
      border: none !important;
    }

    &:focus-within {
      border: 1px solid ${colors.fieldFocus} !important;

      input,
      .input-textarea {
        border: none !important;
      }
    }

    &.disabled {
      background-color: #f5f5f5;
    }
  }

  .input-textarea-tooltip {
    max-height: 300px;
    max-width: 300px;
    overflow: hidden;
    white-space: pre-line;
  }
`;
