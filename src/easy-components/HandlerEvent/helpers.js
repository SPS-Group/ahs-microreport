/* eslint-disable no-restricted-syntax */
import { createAsyncFunctionByString } from '../AsyncFunctionString';

const getFunctions = ({ events, eventName, run, settings }) => {
  if (events) {
    const eventsFound = events.filter(e => {
      e.run = e.run || 'before';
      return e.name === eventName && e.run === run;
    });

    const dynamicFunctions = [];

    for (const event of eventsFound) {
      if (event.handlerType === 'controller') {
        const [controller, methodName] = event.handler.split('.');
        dynamicFunctions.push(
          settings && settings.controllers
            ? settings.controllers[controller][methodName]
            : null
        );
      } else {
        dynamicFunctions.push(
          createAsyncFunctionByString({
            functionString: event.handler,
          })
        );
      }
    }

    return dynamicFunctions;
  }

  return [];
};

export { getFunctions };
