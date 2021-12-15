import { memo } from 'react';

export default function CompareRender(
  element,
  propsToCompare = [],
  propsNotCompare = []
) {
  return memo(element, (prev, next) => {
    let isEqual = true;
    let fields = [];

    if (propsToCompare.length <= 0) {
      Object.keys(prev).forEach(prop => {
        fields.push(prop);
      });
    } else {
      fields = propsToCompare;
    }

    fields.forEach(prop => {
      const propNotCompare = propsNotCompare.find(p => p === prop);
      if (!propNotCompare) {
        switch (typeof prev[prop]) {
          case 'function':
            break;

          case 'object':
            if (prop !== 'children') {
              const jsonPrev = JSON.stringify(prev[prop]);
              const jsonNext = JSON.stringify(next[prop]);
              if (jsonPrev !== jsonNext) {
                isEqual = false;
              }
            }
            break;

          default:
            if (prev[prop] !== next[prop]) {
              isEqual = false;
            }
            break;
        }
      }
    });

    return isEqual;
  });
}
