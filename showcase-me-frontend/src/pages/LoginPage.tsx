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
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
} from "@mui/icons-material";
import teengirl from "../assets/teengirl.png";

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

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
    
      {!isMobile && (
        <Grid
          item
          order={{md:2}}
          md={6}
          sx={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), ${theme.palette.primary.main} url(${teengirl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            position: "relative",
          }}
        >
          <Fade in timeout={1000}>
            <Box
              sx={{
                textAlign: "center",
                color: "white",
                zIndex: 1,
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
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <Box
          sx={{
            p: 4,
            maxWidth: "500px",
            width: "100%",
            mx: "auto",
          }}
        >
          <Fade in timeout={800}>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  mb: 4,
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Login
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
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
                    "&:hover fieldset": {
                      borderColor: "#667eea",
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
                    "&:hover fieldset": {
                      borderColor: "#667eea",
                    },
                  },
                }}
              />

              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                fullWidth
                sx={{
                  mt: 4,
                  mb: 2,
                  height: 48,
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #764ba2, #667eea)",
                  },
                  boxShadow: "0 4px 6px rgba(102, 126, 234, 0.25)",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>

              <Typography align="center" sx={{ mt: 2 }}>
                Don't have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/signup"
                  underline="none"
                  sx={{
                    color: "#667eea",
                    transition: "color 0.3s",
                    "&:hover": {
                      color: "#764ba2",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Sign up here
                </Link>
              </Typography>
            </Box>
          </Fade>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;