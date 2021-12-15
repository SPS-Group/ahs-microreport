import numeral from 'numeral';

numeral.register('locale', 'br', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
  },
  currency: {
    symbol: 'R$',
  },
});

numeral.locale('br');

export default function formatNumber(value, formatter) {
  const number = numeral(parseFloat(value)).format(formatter || '0,0.00');
  return number;
}
