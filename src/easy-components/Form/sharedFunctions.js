const fireEvent = (field, eventName) => {
  switch (eventName) {
    case 'changed':
    case 'onchange':
      // eslint-disable-next-line no-case-declarations
      const evt = new Event('changed');
      field.changed = true;
      field.dispatchEvent(evt);
      break;

    default:
      field.dispatchEvent(new Event(eventName));
      break;
  }
};

export { fireEvent };
