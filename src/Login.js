import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { authApi } from './api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await authApi.post('/auth/login', { email, password });
      // Save tokens to localStorage
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      setMessage('Login successful!');
      window.location.href = '/'; // Redirect to voting portal
    } catch (error) {
      setMessage('Login failed.');
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
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
          Login
        </Button>
      </form>
      {message && <Typography style={{ marginTop: '1em' }}>{message}</Typography>}
    </>
  );
}

export default Login;
