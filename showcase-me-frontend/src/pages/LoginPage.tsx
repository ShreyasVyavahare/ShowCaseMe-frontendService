import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userReducer";
import { login } from "../services/userService";
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
  Alert,
  Paper,
  Container,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  ArrowForward,
} from "@mui/icons-material";
import teengirl from "../assets/teengirl.png";
import logo from "../assets/showcasemelogo.png";

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<FormData>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Form validation and handlers remain the same
  const validateForm = (): boolean => {
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError(null);

    try {
      const data = await login(form);
      localStorage.setItem("token", data.token);
      dispatch(setUser({ user: data.user, token: data.token }));
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const MobileHeader = () => (
    <Box
      sx={{
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${teengirl})`,
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
        }}
      >
        Welcome Back
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
            order={{ md: 2 }}
            md={6}
            sx={{
              background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${teengirl})`,
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
                  Welcome Back
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    maxWidth: "600px",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  Sign in to access your portfolio and continue your journey
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
                  Login
                </Typography>

                {error && (
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3,
                      borderRadius: 2,
                      animation: "shake 0.5s",
                      "@keyframes shake": {
                        "0%, 100%": { transform: "translateX(0)" },
                        "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
                        "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
                      },
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
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
                    "Login"
                  )}
                </Button>

                <Typography align="center" sx={{ mt: 3 }}>
                  Don't have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/"
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
                    Sign up here
                  </Link>
                </Typography>
              </Paper>
            </Fade>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;