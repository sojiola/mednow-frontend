import React, { useState } from "react";
import { TextField, Button, Typography, Select, MenuItem, Link, Checkbox, FormControlLabel, Grid, Snackbar, Paper, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from './AuthService';;
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [role, setRole] = useState("patient");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await registerUser({ firstName, lastName, email, password, role });
      if (response.message === "User created successfully") {
        setSnackbarMessage("Registration successful! Redirecting to login...");
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("An error occurred during registration. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
  };

  const handleFacebookLogin = () => {
    // Implement Facebook login logic here
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={6} style={{ padding: '30px', borderRadius: '10px' }}>
          <Grid container justifyContent="center">
            <Avatar style={{ backgroundColor: '#3b5998', marginBottom: '20px' }}>
              <PersonAddIcon />
            </Avatar>
          </Grid>
          <form onSubmit={handleRegister}>
            <Typography variant="h4" align="center" gutterBottom>Create Your Account</Typography>
            <Typography variant="h6" align="center" gutterBottom>To continue</Typography>
            <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required fullWidth margin="normal" variant="outlined" />
            <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required fullWidth margin="normal" variant="outlined" />
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth margin="normal" variant="outlined" />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth margin="normal" variant="outlined" />
            <TextField label="Re-enter Password" type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} required fullWidth margin="normal" variant="outlined" />
            <Select value={role} onChange={(e) => setRole(e.target.value)} fullWidth margin="normal" variant="outlined">
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
            </Select>
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
              label="Remember me"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px', padding: '10px' }}>Register</Button>
            {error && <Typography color="error" align="center" style={{ marginTop: '10px' }}>{error}</Typography>}
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '10px' }}>
              <Link href="/login">Already have an account? Login here!</Link>
            </Grid>
            <Typography variant="body1" align="center" style={{ margin: '20px 0' }}>or</Typography>
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              fullWidth
              onClick={handleGoogleLogin}
              style={{ backgroundColor: '#db4437', color: '#fff', marginBottom: '10px', padding: '10px' }}
            >
              Register with Google
            </Button>
            <Button
              variant="contained"
              startIcon={<FacebookIcon />}
              fullWidth
              onClick={handleFacebookLogin}
              style={{ backgroundColor: '#3b5998', color: '#fff', padding: '10px' }}
            >
              Register with Facebook
            </Button>
          </form>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Register;
