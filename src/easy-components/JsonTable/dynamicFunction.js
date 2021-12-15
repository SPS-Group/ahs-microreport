import { createAsyncFunctionByString } from '../AsyncFunctionString';

const dynamicFunction = async ({
  functionString,
  params,
  settings,
  promptRef,
  history,
}) => {
  if (functionString) {
    const dynamic = createAsyncFunctionByString({
      functionString,
    });

    const dynamicFunctionProps = settings && settings.dynamicFunctionProps;

    const response = await dynamic({
      ...dynamicFunctionProps,
      ...params,
      history,
      prompt: ({ type, title, message, onConfirm, onCancel }) => {
        promptRef.current.show({
          type,
          title,
          message,
          onConfirm,
          onCancel,
        });
      },
    });

    return response;
  }

  return null;
};

export default dynamicFunction;
