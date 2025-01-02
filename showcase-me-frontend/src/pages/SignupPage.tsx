import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/userService";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  IconButton,
  InputAdornment,
  CircularProgress,
  Fade,
  useTheme,
  useMediaQuery,
  Paper,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  ArrowForward,
} from "@mui/icons-material";
import teenboy from "../assets/teenboy.png";
import logo from "../assets/showcasemelogo.png";

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface FormErrors {
  username: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Validation and handlers remain the same
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { username: "", email: "", password: "" };

    if (!form.username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (form.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (!/(?=.*[0-9])(?=.*[A-Z])/.test(form.password)) {
      newErrors.password = "Password must contain at least one number and one uppercase letter";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await signup(form);
      setShowSuccess(true);
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const MobileHeader = () => (
    <Box
      sx={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${teenboy})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "30vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0 0 24px 24px",
        mb: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          px: 2,
        }}
      >
        Join Our Community
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Grid container sx={{ minHeight: "100vh" }}>
        {/* Desktop Image Section */}
        {!isMobile && (
          <Grid
            item
            md={6}
            sx={{
              background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${teenboy})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Fade in timeout={1000}>
              <Box
                sx={{
                  textAlign: "center",
                  color: "white",
                  zIndex: 1,
                  p: 4,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  Welcome
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    maxWidth: "600px",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  Start your journey with us and create your amazing portfolio
                </Typography>
              </Box>
            </Fade>
          </Grid>
        )}

        {/* Form Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            bgcolor: "background.default",
          }}
        >
          {isMobile && <MobileHeader />}
          
          <Container maxWidth="sm">
            <Fade in timeout={800}>
              <Paper
                elevation={isMobile ? 0 : 0}
                sx={{
                  boxShadow: isMobile? "none":"rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
               
                  p: isMobile ? 2 : 4,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                }}
              >
                 <img src={logo} alt=">Teengirl" width="100%" height="50%
                " />
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  sx={{
                    mb: 4,
                    fontWeight: "bold",
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    textAlign: isMobile ? "center" : "left",
                  }}
                >
                  Create Account
                </Typography>

                <TextField
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  error={!!errors.username}
                  helperText={errors.username}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#764ba2",
                      },
                    },
                  }}
                />

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#764ba2",
                      },
                    },
                  }}
                />

                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#764ba2",
                      },
                    },
                  }}
                />

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                  fullWidth
                  endIcon={!loading && <ArrowForward />}
                  sx={{
                    mt: 4,
                    mb: 2,
                    height: 56,
                    borderRadius: 2,
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #764ba2, #667eea)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 6px rgba(102, 126, 234, 0.25)",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>

                <Typography align="center" sx={{ mt: 3 }}>
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    underline="none"
                    sx={{
                      color: "#667eea",
                      fontWeight: "medium",
                      transition: "all 0.3s",
                      "&:hover": {
                        color: "#764ba2",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Login here
                  </Link>
                </Typography>
              </Paper>
            </Fade>
          </Container>
        </Grid>
      </Grid>
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          variant="filled"
          sx={{ 
            width: '100%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          Account created successfully! Redirecting to login...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignupPage;