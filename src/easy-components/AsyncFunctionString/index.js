/* eslint-disable no-new-func */
const AsyncFunction = new Function(
  `return Object.getPrototypeOf(async function(){}).constructor`
)();

const createAsyncFunctionByString = ({
  functionString,
  inputParamName = 'scope',
}) => {
  const dynamicFunction = new AsyncFunction(inputParamName, functionString);
  return dynamicFunction;
};

const SyncFunction = new Function(
  `return Object.getPrototypeOf(function(){}).constructor`
)();

const createSyncFunctionByString = ({
  functionString,
  inputParamName = 'scope',
}) => {
  const dynamicFunction = new SyncFunction(inputParamName, functionString);
  return dynamicFunction;
};

export { createAsyncFunctionByString, createSyncFunctionByString };
