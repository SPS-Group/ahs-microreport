/* eslint-disable no-restricted-syntax */
import { getFunctions } from './helpers';

export const sendEvent = async ({
  settings,
  eventName,
  run = 'before',
  params,
  mainFormRef,
  formRef,
  events,
  ...rest
}) => {
  if (events && events.length > 0) {
    const dynamicFunctions = getFunctions({
      events,
      settings,
      eventName,
      run,
    });

    let data = null;

    for (const dynamicFunction of dynamicFunctions) {
      let mainData = null;
      if (mainFormRef.current) mainData = mainFormRef.current.getData();

      let formData = null;
      if (formRef.current) formData = formRef.current.getData();

      const props = {
        mainData,
        mainForm: (mainFormRef && mainFormRef.current) || null,
        formData,
        form: formRef.current,
      };

      const dynamicFunctionProps = settings && settings.dynamicFunctionProps;

      // eslint-disable-next-line no-await-in-loop
      const response = await dynamicFunction({
        ...rest,
        ...props,
        ...dynamicFunctionProps,
        params,
      });

      data = response || null;
    }

    return data;
  }

  return null;
};
