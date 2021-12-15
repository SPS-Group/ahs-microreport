import React, { useState } from "react";
import PropTypes from "prop-types";

import Modal from "~/easy-components/Modal";

import { Container } from "./styles";
import Detail from "./Detail";

function ErrorDetail({ errors }) {
  const [isOpenModal, setOpenModal] = useState(false);

  function onClick() {
    setOpenModal(true);
  }

  return (
    <>
      <Container isShow={JSON.stringify(errors) !== "{}"} onClick={onClick}>
        {errors.length === 1 ? (
          <div>{errors[0].message}</div>
        ) : (
          <div>
            Verifique os erros e tente novamente. Clique aqui para maiores
            detalhes.
          </div>
        )}
      </Container>
      <Modal
        isOpened={isOpenModal}
        onClose={() => {
          setOpenModal(false);
        }}
        height="80%"
        width="400px"
        maxHeight="400px"
      >
        <Detail
          errors={errors}
          onClose={() => {
            setOpenModal(false);
          }}
        />
      </Modal>
    </>
  );
}

ErrorDetail.propTypes = {
  errors: PropTypes.shape()
};

ErrorDetail.defaultProps = {
  errors: {}
};

export default ErrorDetail;
