import React, { useState } from 'react';
import { loginUser } from './AuthService';
import './Login.css'; // Importing CSS for styling
import { useNavigate } from "react-router-dom";
import { 
    TextField, Button, Typography, Link, Checkbox, 
    FormControlLabel, Grid, Snackbar, Paper, Avatar, 
    InputAdornment, IconButton, CircularProgress 
  } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleLogin = async (e) => {
      e.preventDefault();
      setError("");
      if (!validateEmail(email)) {
        setError("Invalid email format");
        return;
      }
      setLoading(true);
      try {
        console.log("Attempting login with email:", email); // Log email
        const response = await loginUser({ email, password });
        console.log("Login response:", response); // Log the response
        if (response.token) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("role", response.role);
          sessionStorage.setItem("firstName", response.firstName);
          
          // Fetch and store user profile details
          const profileResponse = await fetchUserProfile(response.token);
          sessionStorage.setItem("profile", JSON.stringify(profileResponse));
  
          setSnackbarMessage(`Login successful! Welcome, ${response.firstName}! Redirecting...`);
          setSnackbarOpen(true);
          setTimeout(() => {
            if (response.role === "admin") {
              navigate("/admin-dashboard");
            } else if (response.role === "patient") {
              navigate("/patient-dashboard");
            } else if (response.role === "doctor") {
              navigate("/doctor-dashboard");
            } else {
              navigate("/user-dashboard");
            }
          }, 1500);
        } else {
          setError(response.message);
        }
      } catch (err) {
        console.error("Login error:", err); // Log the error
        setError("An error occurred during login. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    const fetchUserProfile = async (token) => {
      try {
        const response = await fetch('/api/user-profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return await response.json();
      } catch (error) {
        console.error("Error fetching user profile:", error);
        return {};
      }
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
                <LockOutlinedIcon />
              </Avatar>
            </Grid>
            <form onSubmit={handleLogin}>
              <Typography variant="h4" align="center" gutterBottom>Welcome Back</Typography>
              <Typography variant="h6" align="center" gutterBottom>Please sign in to continue</Typography>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                margin="normal"
                variant="outlined"
                error={Boolean(error && !validateEmail(email))}
                helperText={error && !validateEmail(email) ? error : ""}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                margin="normal"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                label="Remember me"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '20px', padding: '10px' }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Login"}
              </Button>
              {error && validateEmail(email) && <Typography color="error" align="center" style={{ marginTop: '10px' }}>{error}</Typography>}
              <Typography variant="body1" align="center" style={{ margin: '20px 0' }}>or</Typography>
              <Button
                variant="contained"
                startIcon={<GoogleIcon />}
                fullWidth
                onClick={() => {
                  // Trigger Google login
                }}
                style={{ backgroundColor: '#db4437', color: '#fff', marginBottom: '10px', padding: '10px' }}
              >
                Login with Google
              </Button>
              <Button
                variant="contained"
                startIcon={<FacebookIcon />}
                fullWidth
                onClick={() => {
                  // Trigger Facebook login
                }}
                style={{ backgroundColor: '#3b5998', color: '#fff', padding: '10px' }}
              >
                Login with Facebook
              </Button>
              <Grid container justifyContent="center" style={{ marginTop: '10px' }}>
                <Link
                  component="button"
                  variant="body2"
                  style={{ fontSize: '14px', textTransform: 'capitalize' }}
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Your Password?
                </Link>
              </Grid>
              <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '10px' }}>
                <Link
                  component="button"
                  variant="body2"
                  style={{ fontSize: '14px', textTransform: 'capitalize' }}
                  onClick={() => navigate("/register")}
                >
                  Don't Have An Account? Register Now!
                </Link>
              </Grid>
            </form>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              message={snackbarMessage}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              ContentProps={{
                style: { backgroundColor: snackbarMessage.includes("successful") ? "green" : "red", color: "#fff" },
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
  
export default Login;
  