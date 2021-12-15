/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */

export function replacePlaceholdersText({
  text,
  placeholderTemplate,
  data,
  isReturnObj = false,
}) {
  let rawText = text || '';

  // eslint-disable-next-line guard-for-in
  for (const prop in data) {
    const placeholder = placeholderTemplate.replace('?', prop);
    const re = new RegExp(placeholder, 'gi');

    const value = data[prop];

    rawText = rawText.replace(re, value || 'null');
  }

  // Altera a string 'null' para um valor null
  // const reNull = new RegExp(`'null'`, 'g');
  const reNull = /'null'/g;
  rawText = rawText.replace(reNull, null);

  if (isReturnObj) {
    return rawText === '' ? null : JSON.parse(rawText);
  }

  return rawText;
}
