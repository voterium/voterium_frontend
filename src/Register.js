import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { authApi } from './api';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await authApi.post('/register', { email, password });
      setMessage('Registration successful! Please log in.');
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      setMessage('Registration failed.');
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '1em' }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '1em' }}
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
      {message && <Typography style={{ marginTop: '1em' }}>{message}</Typography>}
    </>
  );
}

export default Register;
