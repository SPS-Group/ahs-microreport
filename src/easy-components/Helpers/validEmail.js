export default function isValidEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regexEmail.test(email)) {
    return true;
  }
  return false;
}
