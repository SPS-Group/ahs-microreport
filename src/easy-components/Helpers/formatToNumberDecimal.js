import { Decimal } from 'decimal.js';

function formatToNumber(value, decimalPrecision) {
  if (typeof value === 'string') {
    // -> /[^0-9.,]/g, ''
    let val = value.split('.').join('');
    val = val.split(',').join('.');
    val = +val;

    const t = new Decimal(val);
    return parseFloat(t.toFixed(parseInt(decimalPrecision, 10)));
  }

  return value;
}

function formatMoney(amount, decimalCount, decimal = '.', thousands = ',') {
  try {
    if (amount === null) return '';

    decimalCount = Math.abs(decimalCount);
    // eslint-disable-next-line no-restricted-globals
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    // eslint-disable-next-line radix
    const i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();

    const j = i.length > 3 ? i.length % 3 : 0;

    const formattedData =
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '');

    return formattedData;
  } catch (e) {
    return 0;
  }
}

export { formatToNumber, formatMoney };
