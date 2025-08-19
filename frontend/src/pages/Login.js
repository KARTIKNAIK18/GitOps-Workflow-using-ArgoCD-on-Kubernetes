import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isSignup ? '/auth/signup' : '/auth/login';
      const res = await axios.post(`${process.env.REACT_APP_API_URL}${endpoint}`, { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Card sx={{ minWidth: 350, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>Task Manager 📝</Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField label="Username" variant="outlined" fullWidth value={username} onChange={e => setUsername(e.target.value)} autoFocus />
              <TextField label="Password" variant="outlined" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
              {error && <Typography color="error" align="center">{error}</Typography>}
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button type="submit" variant="contained">{isSignup ? 'Sign Up' : 'Login'}</Button>
                <Button variant="outlined" onClick={() => setIsSignup(!isSignup)}>{isSignup ? 'Login' : 'Sign Up'}</Button>
              </Stack>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
