import React, { useState } from 'react';

const base = "http://127.0.0.1:7002/api/register"

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    console.log("handleRegister");
    try {
      const response = await fetch(base, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // const newUser = await response.json();
        // onRegister(newUser); // Assuming `onRegister` is a callback to handle successful registration
      } else {
        console.error('Register failed');
      }
    } catch (error) {
      console.error('User already exists.', error);
    }
  };

  return (
    <div>
      <h2>注册</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>确认</button>
    </div>
  );
};

export default Register;

