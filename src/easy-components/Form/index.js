/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState, useImperativeHandle } from 'react';
import ErrorInformation from './ErrorInformation';

import { Container } from './styles';

const FormElement = React.forwardRef(
  ({ errors, data, children, ...rest }, ref) => {
    const useRefVariable = useRef(ref);
    const formRef = ref || useRefVariable;

    const [, setRefreshDate] = useState(null);

    useEffect(() => {
      if (formRef.current) {
        formRef.current.reset();
        formRef.current.setData(data || {});
      }
    }, [data, formRef]);

    useEffect(() => {
      if (formRef.current) formRef.current.setErrors(errors || {});
    }, [errors, formRef]);

    useImperativeHandle(ref, () => ({
      ...formRef.current,
      refresh: () => {
        setRefreshDate(new Date());
      },
    }));

    return (
      <>
        <Container
          ref={formRef}
          {...rest}
          initialData={data}
          autoComplete="off"
        >
          {children}
        </Container>
        <ErrorInformation errors={errors} />
      </>
    );
  }
);

export default FormElement;
