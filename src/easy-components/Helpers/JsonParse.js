export default function JsonParseFunction(jsonText) {
  return jsonText && jsonText.replace(/\t/g, ' ').replace(/\n/g, ' ');
}
