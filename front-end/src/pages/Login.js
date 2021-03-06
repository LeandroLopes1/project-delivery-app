import React, { useContext, useState, useEffect } from 'react';

import { Link, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import ContextRegister from '../context/ContextRegister';
import rockGlass from '../images/rockGlass.svg';

function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState(false);

  const {
    email,
    password,
    setEmail,
    setPassword,
  } = useContext(ContextRegister);

  const users = localStorage.getItem('user');

  const history = useHistory();

  const API_URL = 'http://localhost:3001/';

  const loginUser = async (login) => {
    const response = await axios.post(`${API_URL}login`, login);
    return response;
  };

  useEffect(() => {
    const isValid = () => {
      const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      const min = 6;
      const passwordValid = password.length >= min;
      if (emailValid && passwordValid) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    isValid();
  }, [email, password, setIsDisabled]);

  const handleSubmitLogin = async () => {
    const roles = {
      administrator: '/admin/manage',
      seller: '/seller/orders',
    };

    if (!email || !password) setErrorMsg(true);

    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem('user', JSON.stringify(data));
      return history.push({ pathname: roles[data.role] || '/customer/products' });
    } catch (error) {
      setErrorMsg(true);
    }
  };

  return users ? (
    <Redirect to="/customer/products" />
  ) : (
    <div>
      <span className="logo">TRYBE</span>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
      <form>
        Login:
        <input
          type="email"
          name="email"
          data-testid="common_login__input-email"
          onChange={ ({ target }) => setEmail(target.value) }
        />
        Senha:
        <input
          type="password"
          name="senha"
          data-testid="common_login__input-password"
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          data-testid="common_login__button-login"
          type="button"
          disabled={ isDisabled }
          onClick={ () => handleSubmitLogin() }
        >
          LOGIN
        </button>
        <button type="button" data-testid="common_login__button-register">
          <Link to="/register">Ainda n??o tenho conta</Link>
        </button>
        {errorMsg && (
          <span data-testid="common_login__element-invalid-email">
            Email ou senha inv??lidos
          </span>
        )}
      </form>
    </div>
  );
}

export default Login;
