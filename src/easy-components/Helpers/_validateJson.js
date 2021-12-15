import TreatError from '../TreatError';

export default function validateJson(json) {
  try {
    if (json) {
      JSON.parse(json);
    }
  } catch (error) {
    const message = TreatError.getDescription(error);

    throw new Error(`Formato Inválido. ${message}.`);
  }
}
