import React, { useState } from 'react';
import { TextField, Button, Typography, Link, Paper, Grid, Avatar } from '@mui/material';
import axios from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error sending reset link. Please try again.');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={6} style={{ padding: '30px', borderRadius: '10px' }}>
          <Grid container justifyContent="center">
            <Avatar style={{ backgroundColor: '#3b5998', marginBottom: '20px' }}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>
          <Typography variant="h4" align="center" gutterBottom>
            Forgot Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your email address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '20px', padding: '10px' }}
            >
              Send Reset Link
            </Button>
            {message && (
              <Typography variant="body2" align="center" style={{ marginTop: '1rem', color: 'red' }}>
                {message}
              </Typography>
            )}
            <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
              Remember your password? <Link href="/login">Log in here</Link>.
            </Typography>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
