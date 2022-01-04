import React, { useState } from 'react';

import PropTypes from 'prop-types';

import ContextRegister from './ContextRegister';

function Provider({ children }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const state = {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
  };

  return (
    <ContextRegister.Provider value={ state }>
      {children}
    </ContextRegister.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;