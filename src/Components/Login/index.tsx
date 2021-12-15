import React, { useRef } from 'react';

// import { Container } from './styles';
interface LoginProps {
  // eslint-disable-next-line no-unused-vars
  onLogin(username: string, password: string): void;
  loginErrorMessage?: string;
}

const Login: React.FC<LoginProps> = ({
  onLogin,
  loginErrorMessage,
}: LoginProps) => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input ref={userNameRef} />
      <input ref={passwordRef} />
      <button
        type="button"
        onClick={() =>
          onLogin(
            userNameRef.current ? userNameRef.current.value : '',
            passwordRef.current ? passwordRef.current.value : ''
          )
        }
      >
        Login
      </button>
      {loginErrorMessage && <p>{loginErrorMessage}</p>}
    </div>
  );
};

export default Login;
