import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchPortfolio } from '../services/portfolioService';
import {
  Box,
  Typography,
  Grid,
  Chip,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  ThemeProvider,
  createTheme,
  Paper,
  Fade,
  CircularProgress,
  useTheme
} from '@mui/material';
import {
  LinkedIn,
  Instagram,
  GitHub,
  Email,
  DarkMode,
  LightMode,
  ArrowForward,
  Download,
  ArrowBack
} from '@mui/icons-material';
import skillsImage from "../assets/skills.jpg"
import educationImg from "../assets/edu.jpeg"
import LanguageIcon from '@mui/icons-material/Language';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Footer from '../components/Footer';


interface Portfolio {
  personalDetails: {
    name: string;
    email: string;
    linkedinURL: string;
    githubURL: string;
    instagramURL: string;
    Role: string;
 
    profileImageURL: string;
    resumeDriveLink: string;
  };
  skills: string[];
  experience: {
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  projects: {
    name: string;
    description: string;
    link: string;
    projectImage: string;
  }[];
  education: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
  }[];
  languages: string[];
  softSkills: string[];
  description: string;
}

const PortfolioPage = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#ffffff',
        paper: 'rgba(255, 255, 255, 0.1)',
      },
      text: {
        primary: '#000000',
        secondary: 'rgba(0, 0, 0, 0.7)',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#121212',
        paper: 'rgba(18, 18, 18, 0.1)',
      },
      text: {
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.7)',
      },
    },
  });

  const theme = isDarkMode ? darkTheme : lightTheme;
  const [loading, setLoading] = useState(true);

  const gradients = {
    header: isDarkMode
      ? 'linear-gradient(135deg, #1a1a1a 0%, #2d1a4d 100%)'
      : 'linear-gradient(135deg, #7F7FD5 0%, #86A8E7 50%, #91EAE4 100%)', // Cool professional blue gradient

    skills: isDarkMode
      ? 'linear-gradient(135deg, #2d1a4d 0%, #1a1a1a 100%)'
      : 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)', // Warm energetic orange-red

    experience: isDarkMode
      ? 'linear-gradient(135deg, #1a1a1a 0%, #1a4d4a 100%)'
      : 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', // Fresh mint to ocean blue

    projects: isDarkMode
      ? 'linear-gradient(135deg, #4a1a4d 0%, #1a1a1a 100%)'
      : 'linear-gradient(135deg, #B06AB3 0%, #4568DC 100%)', // Royal purple to electric blue

    education: isDarkMode
      ? 'linear-gradient(135deg, #1a1a1a 0%, #4a1a4d 100%)'
      : 'linear-gradient(135deg, #2BC0E4 0%, #EAECC6 100%)', // Sky blue to soft yellow

    languages: isDarkMode
      ? 'linear-gradient(135deg, #1a4d4a 0%, #2d1a4d 100%)'
      : 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)', // Soft pink gradient
  };

  const GlassmorphicCard: React.FC<{ gradient: string; animate?: boolean; children: React.ReactNode }> = ({ children, gradient, animate = true }) => {
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
      }
    };

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={animate ? cardVariants : {}}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Card
          sx={{
            background: gradient,
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
            boxShadow: `0 8px 32px ${isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(61, 61, 61, 0.48)'}`,
            overflow: 'hidden',
            height: '100%',
            minHeight: '250px',
          }}
        >
          {children}
        </Card>
      </motion.div>
    );
  };
  const ExperienceTimeline: React.FC<{ experiences: Portfolio['experience']; isDarkMode: boolean }> = ({ experiences, isDarkMode }) => {
    // Sort experiences by endDate in descending order
    const sortedExperiences = experiences.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
  
    return (
      <Grid item xs={12} md={12}>
        <GlassmorphicCard gradient={gradients.experience}>
          <CardContent>
            <SectionTitle>Experience</SectionTitle>
            <Box
              sx={{
                display: 'flex',
                overflowX: 'auto',
                pb: 2,
                '&::-webkit-scrollbar': {
                  height: 8,
                },
                '&::-webkit-scrollbar-track': {
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(154, 55, 55, 0.1)',
                  borderRadius: 4,
                },
                '&::-webkit-scrollbar-thumb': {
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                  borderRadius: 4,
                  '&:hover': {
                    background: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                  },
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, px: 2 }}>
                {sortedExperiences.map((exp, index) => (
                  <React.Fragment key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Paper
                        elevation={3}
                        sx={{
                          p: 3,
                          minWidth: 300,
                          maxWidth: 300,
                          background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.51)',
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                          position: 'relative',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            transition: 'transform 0.3s ease',
                          },
                        }}
                      >
                        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                          <Box sx={{ position: 'relative' }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 'bold',
                                color: isDarkMode ? '#fff' : '#333',
                              }}
                            >
                              {exp.position}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : '#666',
                                fontWeight: 500,
                                mb: 1,
                              }}
                            >
                              {exp.company}
                            </Typography>
                            <Box
                              sx={{
                                display: 'inline-block',
                                px: 1.5,
                                py: 0.5,
                                bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                                borderRadius: 1,
                                mb: 2,
                              }}
                            >
                              <Typography variant="body2">
                                {new Date(exp.startDate).getFullYear()} - {new Date(exp.endDate).getFullYear()}
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : '#555',
                                lineHeight: 1.6,
                              }}
                            >
                              {exp.description}
                            </Typography>
                          </Box>
                        </motion.div>
                      </Paper>
                    </motion.div>
                    {index < sortedExperiences.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.1 }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.3)',
                          }}
                        >
                          <motion.div
                            animate={{
                              x: [0, 10, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          >
                            <ArrowBack
                              sx={{
                                fontSize: 30,
                                color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.3)',
                              }}
                            />
                          </motion.div>
                        </Box>
                      </motion.div>
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Box>
          </CardContent>
        </GlassmorphicCard>
      </Grid>
    );
  };

  const SkillChip: React.FC<{ label: string }> = ({ label }) => (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Chip
        label={label}
        sx={{
          m: 0.5,
          background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
          color: theme.palette.text.primary,
          backdropFilter: 'blur(4px)',
          '&:hover': {
            background: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.4)',
          }
        }}
      />
    </motion.div>
  );

  const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          background: isDarkMode ? 'linear-gradient(45deg, #fff, #888)' : 'linear-gradient(45deg, #333, #000)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontWeight: 'bold'
        }}
      >
        {children}
      </Typography>
    </motion.div>
  );


  const LoadingSpinner = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
  
    return (
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 4,
        p: 6,
        background: isDarkMode
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d3436 50%, #1a1a1a 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  
        boxShadow: isDarkMode 
          ? '0 8px 32px rgba(0, 0, 0, 0.4)'
          : '0 8px 32px rgba(31, 38, 135, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDarkMode
            ? 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15), transparent 70%)'
            : 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1), transparent 70%)',
          animation: 'pulse 3s ease-in-out infinite',
        }
      }}
    >
      <Fade in={true} style={{ transitionDelay: '100ms' }}>
        <CircularProgress
          size={80}
          thickness={4}
          sx={{
            animation: 'spin 1s linear infinite',
            '@keyframes spin': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              }
            },
            '& .MuiCircularProgress-svg': {
              color: isDarkMode ? '#6366f1' : '#4f46e5',
              filter: `drop-shadow(0 0 8px ${isDarkMode ? 'rgba(99, 102, 241, 0.5)' : 'rgba(79, 70, 229, 0.3)'})`
            }
          }}
        />
      </Fade>
      
      <Fade
        in={true}
        style={{
          transitionDelay: '200ms',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
            fontWeight: 500,
            letterSpacing: '0.05em',
            animation: 'textPulse 2s ease-in-out infinite',
            '@keyframes textPulse': {
              '0%': { opacity: 0.5 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.5 },
            },
            textShadow: isDarkMode
              ? '0 0 20px rgba(99, 102, 241, 0.3)'
              : '0 0 20px rgba(99, 102, 241, 0.2)',
          }}
        >
          Loading...
        </Typography>
      </Fade>
    </Box>
    );
  };

  useEffect(() => {
    const getPortfolio = async () => {
      try {
        if (username) {
          const data = await fetchPortfolio(username);
          setPortfolio(data);
        } else {
          console.error("Username is undefined");
          setPortfolio(null);
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        setPortfolio(null);
      } finally {
        setLoading(false);
      }
    };
  
    getPortfolio();
  }, [username]);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
  <LoadingSpinner />
</ThemeProvider>
    );
  }
  
  if (!portfolio) {
    return (
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 4,
        p: 6,
        background: isDarkMode
          ? 'linear-gradient(135deg, #1a1a1a 0%, #2d3436 50%, #1a1a1a 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
     
        boxShadow: isDarkMode 
          ? '0 8px 32px rgba(0, 0, 0, 0.4)'
          : '0 8px 32px rgba(31, 38, 135, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDarkMode
            ? 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15), transparent 70%)'
            : 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1), transparent 70%)',
          animation: 'pulse 3s ease-in-out infinite',
        }
      }}
    >
      
    
      
      <Fade
        in={true}
        style={{
          transitionDelay: '200ms',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
            fontWeight: 500,
            letterSpacing: '0.05em',
            animation: 'textPulse 2s ease-in-out infinite',
            '@keyframes textPulse': {
              '0%': { opacity: 0.5 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.5 },
            },
            textShadow: isDarkMode
              ? '0 0 20px rgba(99, 102, 241, 0.3)'
              : '0 0 20px rgba(99, 102, 241, 0.2)',
          }}
        >
          Portfolio not found
        </Typography>
      </Fade>
    </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: isDarkMode ? '#121212' : '#ffffff',
          p: { xs: 2, md: 4 },
          transition: 'background 0.3s ease'
        }}
      >
        <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
          <IconButton onClick={() => setIsDarkMode(!isDarkMode)} color="inherit">
            {isDarkMode ? 
            <Tooltip title="switch to Light mode">
              <LightMode sx={{ color: 'white' }} />
            </Tooltip>
            
            
            
            : 
            <Tooltip title="switch to Dark mode">
            <DarkMode />
          </Tooltip>
            
            }
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          {/* Header Section */}
          <Grid item xs={12}>
            <GlassmorphicCard gradient={gradients.header}>
              <CardContent sx={{ py: 4 }}>
                <Grid container spacing={4} alignItems="center">
                  {/* Profile Image Section */}
                  <Grid item xs={12} md={6}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 100
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          width: 250,
                          height: 250,
                          margin: '0 auto',
                          cursor: 'pointer',
                        }}
                      >
                        {/* Rotating Outer Ring */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            border: '2px dashed',
                            borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                          }}
                        />

                        {/* Inner Circle with Gradient Border */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            position: 'absolute',
                            top: '10%',
                            left: '10%',
                            width: '80%',
                            height: '80%',
                          }}
                        >
                          <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              borderRadius: '50%',
                              position: 'relative',
                              background: isDarkMode ?
                                'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))' :
                                'linear-gradient(45deg, rgba(0,0,0,0.05), rgba(0,0,0,0.1))',
                              padding: '3px', // Creates space for the gradient border
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: '50%',
                                padding: '2px',
                                background: 'linear-gradient(45deg, #7F7FD5, #91EAE4)',
                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'xor',
                                maskComposite: 'exclude',
                              }
                            }}
                          >
                            <Box
                              component="img"
                              src={portfolio.personalDetails.profileImageURL}
                              sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                objectFit: 'cover',
                              }}
                            />
                            <Box
                              sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                              }}
                            />
                          </Box>
                        </motion.div>

                        {/* Floating Dots Animation */}
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            style={{
                              position: 'absolute',
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              background: isDarkMode ? '#fff' : '#000',
                              opacity: 0.2,
                            }}
                            animate={{
                              x: [0, 30 * Math.cos(i * Math.PI / 4), 0],
                              y: [0, 30 * Math.sin(i * Math.PI / 4), 0],
                              opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </Box>
                    </motion.div>
                  </Grid>

                  {/* Details Section */}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <Typography
                          variant="h3"
                          sx={{
                            mb: 2,
                            background: isDarkMode ?
                              'linear-gradient(45deg, #fff, #888)' :
                              'linear-gradient(45deg, #333, #000)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            fontWeight: 'bold'
                          }}
                        >
                          {portfolio.personalDetails.name}
                        </Typography>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            mb: 3,
                            color: theme.palette.text.secondary,
                            fontWeight: '500'
                          }}
                        >
                          {portfolio.personalDetails.Role}
                        </Typography>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            mb: 4,
                            color: theme.palette.text.secondary,
                            lineHeight: 1.8,
                            maxWidth: '600px'
                          }}
                        >
                          {portfolio.description}
                        </Typography>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: { xs: 'center', md: 'flex-start' },
                            mb: 3
                          }}
                        >
                          {[
                            { icon: <Email />, url: `mailto:${portfolio.personalDetails.email}`, title: 'Email' },
                            { icon: <LinkedIn />, url: portfolio.personalDetails.linkedinURL, title: 'LinkedIn' },
                            { icon: <GitHub />, url: portfolio.personalDetails.githubURL, title: 'GitHub' },
                            { icon: <Instagram />, url: portfolio.personalDetails.instagramURL, title: 'Instagram' },
                            { icon: <Download />, url: portfolio.personalDetails.resumeDriveLink, title: 'Resume Link' }
                          ].map((social, index) => (
                            <motion.div
                              key={index}
                              whileHover={{
                                scale: 1.2,
                                rotate: 5,
                                transition: { duration: 0.2 }
                              }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Tooltip title={social.title}>
                              <IconButton
  color="inherit"
  href={social.url}
  target="_blank"
  rel="noopener noreferrer"
  sx={{
    bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
      transform: 'translateY(-2px)',
      transition: 'all 0.3s ease'
    }
  }}
>
  {social.icon}
</IconButton>
                              </Tooltip>
                            </motion.div>
                          ))}
                        </Box>
                      </motion.div>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </GlassmorphicCard>
          </Grid>

          {/* Skills Section */}
          <Grid item xs={12} md={6}>
  <GlassmorphicCard gradient={gradients.skills}>
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        flexDirection: { xs: 'column', md: 'row' }, // Column on mobile, row on larger screens
        overflow: 'hidden',
      }}
    >
      {/* Image Section - 40% */}
      <Box
        sx={{
          width: { xs: '100%', md: '40%' }, // Full width on mobile, 40% on larger screens
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: '200px', md: 'auto' }, // Minimum height for mobile view
        }}
      >
        <img
          src={skillsImage}
          alt="Skills visualization"
          style={{
            width: '100%',
            height: '100%',
            minHeight: "250px",
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        {/* Overlay to maintain glassmorphic effect consistency */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(0px)',
          }}
        />
      </Box>

      {/* Content Section - 60% */}
      <CardContent
        sx={{
          width: { xs: '100%', md: '60%' }, // Full width on mobile, 60% on larger screens
          overflow: 'hidden',
          p: 3,
        }}
      >
        <SectionTitle>Skills</SectionTitle>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            maxHeight: '100%',
            overflow: 'auto',
            '& > *': {
              flexBasis: { xs: 'calc(25% - 8px)', md: 'auto' }, // 4 skills per line on mobile
            },
          }}
        >
          {portfolio.skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <SkillChip label={skill} />
            </motion.div>
          ))}
        </Box>
      </CardContent>
    </Box>
  </GlassmorphicCard>
</Grid>

          {/* Education Section */}
          <Grid item xs={12} md={6}>
            <GlassmorphicCard gradient={gradients.education}>
              <Box
                sx={{
                  display: 'flex',
                  height: '100%',
                  flexDirection: { xs: 'column', md: 'row' }, // Column on mobile, row on larger screens
                }}>
                <Box
                  sx={{
                    width: { xs: '100%', md: '40%' }, // Full width on mobile, 40% on larger screens
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: { xs: '200px', md: 'auto' }, // Minimum height for mobile view
                  }}
                >
                  <img
                    src={educationImg}
                    alt="Skills visualization"
                    style={{
                      width: '100%',
                      height: '100%',
                      minHeight: "250px",
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                  {/* Overlay to maintain glassmorphic effect consistency */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(0px)',
                    }}
                  />
                </Box>


                {/* Content Section - 60% */}
                <CardContent sx={{
                  width: '60%',
                  p: 3,
                  maxHeight: '100%',
                  overflow: 'auto'
                }}>
                  <SectionTitle>Education</SectionTitle>
                  {portfolio.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 'bold'
                          }}
                        >
                          {edu.institution}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: theme.palette.text.secondary
                          }}
                        >
                          {edu.degree}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary
                          }}
                        >
                          {edu.fieldOfStudy}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            opacity: 0.8,
                            color: theme.palette.text.secondary
                          }}
                        >
                          {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </CardContent>
              </Box>
            </GlassmorphicCard>
          </Grid>
          {/* Experience Section */}
          {/* <Grid item xs={12} md={12}>
            <GlassmorphicCard gradient={gradients.experience}>
              <CardContent>
                <SectionTitle>Experience</SectionTitle>
                {portfolio.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6">{exp.position}</Typography>
                      <Typography variant="subtitle1">{exp.company}</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {new Date(exp.startDate).getFullYear()} - {new Date(exp.endDate).getFullYear()}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>{exp.description}</Typography>
                    </Box>
                  </motion.div>
                ))}
              </CardContent>
            </GlassmorphicCard>
          </Grid> */}
          <ExperienceTimeline experiences={portfolio.experience} isDarkMode={isDarkMode} />

          {/* Projects Section */}
          <Grid item xs={12}>
  <GlassmorphicCard gradient={gradients.projects}>
    <CardContent>
      <SectionTitle>Projects</SectionTitle>
      <Grid container spacing={2}>
        {portfolio.projects.map((project, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                sx={{
                  height: '100%',
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                  color: theme.palette.text.primary,
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative', // Add relative positioning
                    overflow: 'hidden', // Ensure the gradient overlay stays within the box
                  }}
                >
                  {project.projectImage ? (
                    <img
                      src={project.projectImage}
                      alt="Project"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                        zIndex: 1,
                      }}
                    >
                      No image found
                    </Typography>
                  )}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(0,0,0,0.5), rgba(0,0,0,0.1))', // Add your gradient here
                      zIndex: 1, // Ensure the gradient is above the image
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6">{project.name}</Typography>
                  <Tooltip title={project.description} arrow>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {project.description.length > 150
                        ? `${project.description.substring(0, 150)}...`
                        : project.description}
                    </Typography>
                  </Tooltip>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <IconButton
                      size="small"
                      href={project.link}
                      sx={{ color: theme.palette.text.primary }}
                    >
                      <ArrowForward />
                    </IconButton>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </CardContent>
  </GlassmorphicCard>
</Grid>



          {/* Languages & Soft Skills Section */}
          <Grid item xs={12} md={6}>
            <GlassmorphicCard
              gradient={isDarkMode
                ? 'linear-gradient(135deg, #1a4d4a 0%, #2d1a4d 100%)'
                : 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
              }
            >
              <CardContent>
                <SectionTitle>Languages</SectionTitle>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {portfolio.languages.map((language, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <Chip
                        label={language}
                        icon={<LanguageIcon />} // Add an icon to the chip
                        sx={{
                          m: 0.5,
                          background: isDarkMode
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.1)',
                          color: theme.palette.text.primary,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: isDarkMode
                              ? 'rgba(255, 255, 255, 0.2)'
                              : 'rgba(0, 0, 0, 0.2)',
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </GlassmorphicCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <GlassmorphicCard
              gradient={isDarkMode
                ? 'linear-gradient(135deg, #1a4d4a 0%, #2d1a4d 100%)'
                : 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
              }
            >
              <CardContent>
                <SectionTitle>Soft Skills</SectionTitle>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {portfolio.softSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <Chip
                        label={skill}
                        icon={<EmojiPeopleIcon />} // Add an icon to the chip
                        sx={{
                          m: 0.5,
                          background: isDarkMode
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.1)',
                          color: theme.palette.text.primary,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: isDarkMode
                              ? 'rgba(255, 255, 255, 0.2)'
                              : 'rgba(0, 0, 0, 0.2)',
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </GlassmorphicCard>
          </Grid>
        </Grid>
        <Footer darkMode={isDarkMode}></Footer>
      </Box>
   
    </ThemeProvider>
  );
};

export default PortfolioPage;