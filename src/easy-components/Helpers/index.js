import email from './validEmail';
import cpf from './validCPF';
import cnpj from './validCNPJ';
import dateFormatter from './dateFormat';
import formatNum from './formatNumber';
import { formatMoney, formatToNumber } from './formatToNumberDecimal';
import b64ToBlobFunction from './b64toBlob';
// import validateJsonFunction from './validateJson';
import downloadLinkFunction from './downloadLink';
import JsonParseFunction from './JsonParse';

export const isValidEmail = email;
export const validCNPJ = cnpj;
export const validCPF = cpf;
export const dateFormat = dateFormatter;
export const formatNumber = formatNum;
export const formatToStringDecimal = formatMoney;
export const formatToNumberDecimal = formatToNumber;
export const b64ToBlob = b64ToBlobFunction;
// export const validateJson = validateJsonFunction;
export const downloadLink = downloadLinkFunction;
export const JsonParse = JsonParseFunction;

export default {};
