import { isSafari } from 'react-device-detect';

export default function ({ url, fileName }) {
  if (isSafari) {
    const a = document.createElement('a');

    document.body.appendChild(a);

    a.style = 'display: none';

    a.href = `${process.env.REACT_APP_SERVER_URL}/${url}`;

    a.download = fileName;

    a.click();

    document.body.removeChild(a);
  } else window.open(`${process.env.REACT_APP_SERVER_URL}/${url}`);
}
