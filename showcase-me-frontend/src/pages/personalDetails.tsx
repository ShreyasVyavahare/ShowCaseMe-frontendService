import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Avatar, 
  IconButton, 
  Tooltip,

  Chip,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  LinkedIn,
  GitHub,
  Instagram,
  Email,
  Phone,
  Description,

  Security,

} from '@mui/icons-material';
import BinaryRain from './binaryRain';

const glitchEffect = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    textShadow: [
      '0 0 5px #00ff41',
      '0 0 10px #00ff41',
      '0 0 15px #00ff41',
      '0 0 5px #00ff41',
    ],
    transition: { duration: 1 }
  },
  hover: {
    scale: 1.05,
    textShadow: '0 0 20px #00ff41',
    transition: { duration: 0.3 }
  }
};

interface PersonalDetailsProps {
  data: {
    personalDetails?: {
      name?: string;
      role?: string;
      email?: string;
      phone?: string;
      linkedinURL?: string;
      githubURL?: string;
      instagramURL?: string;
      resumeDriveLink?: string;
      profileImageURL?: string;
    };
    description?: string;
  };
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [typingComplete, setTypingComplete] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const fullText = data?.personalDetails?.name || 'HACKER PROFILE';
  const role = data?.personalDetails?.role || 'CYBER SPECIALIST';
  const email = data?.personalDetails?.email || 'secure@encrypted.com';
  const phone = data?.personalDetails?.phone || '***-***-****';
  
  // Typing effect for name
  const [displayedName, setDisplayedName] = useState('');
  
  useEffect(() => {
    setDisplayedName(fullText); // Set the full text immediately
    setTypingComplete(true); // Mark typing as complete
  }, [fullText]);

  // Random glitch effect
  useEffect(() => {
    if (typingComplete) {
      const glitchInterval = setInterval(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }, 5000 + Math.random() * 10000);
      return () => clearInterval(glitchInterval);
    }
  }, [typingComplete]);

  const socialLinks = [
    { icon: <LinkedIn />, url: data?.personalDetails?.linkedinURL, label: 'LinkedIn' },
    { icon: <GitHub />, url: data?.personalDetails?.githubURL, label: 'GitHub' },
    { icon: <Instagram />, url: data?.personalDetails?.instagramURL, label: 'Instagram' },
    { icon: <Email />, url: `mailto:${email}`, label: 'Encrypted Email' },
    { icon: <Phone />, url: `tel:${phone}`, label: 'Secure Line' },
    { icon: <Description />, url: data?.personalDetails?.resumeDriveLink, label: 'Decrypt Resume' },
  ];

;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        // background: 'radial-gradient(circle, rgba(0,10,5,0.9) 0%, rgba(0,0,0,1) 100%)',
        color: '#00ff41',
        paddingLeft : { xs: 2, md: 6 },
        paddingRight : { xs: 2, md: 6 },
        paddingTop : { xs: 2, md: 0 },
        paddingBottom : { xs: 2, md: 0 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <BinaryRain />
      
      <Grid container spacing={6} sx={{ position: 'relative', zIndex: 1 }}>
        {/* Left Side - Profile Picture and Basic Info */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMobile ? 'center' : 'center',
              gap: 3,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Avatar
                src={data?.personalDetails?.profileImageURL}
                sx={{
                  width: 200,
                  height: 200,
                  border: '3px solid #00ff41',
                  boxShadow: '0 0 30px rgba(0, 255, 65, 0.5)',
                  position: 'relative',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: -5,
                    left: -5,
                    right: -5,
                    bottom: -5,
                    border: '2px solid #00ff41',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite',
                  },
                  '&:hover': {
                    boxShadow: '0 0 40px rgba(0, 255, 65, 0.8)',
                    '&:before': {
                      animation: 'pulse 1s infinite',
                    },
                  },
                }}
              />
            </motion.div>
            
            <Box>
              <AnimatePresence>
                {glitchActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute',
                      color: '#ff00ff',
                      fontFamily: '"Courier New", monospace',
                      filter: 'blur(1px)',
                    }}
                  >
                    {displayedName.split('').map((char, i) => (
                      <span 
                        key={i} 
                        style={{
                          position: 'relative',
                          left: `${Math.random() * 10 - 5}px`,
                        }}
                      >
                        {Math.random() > 0.5 ? char : String.fromCharCode(char.charCodeAt(0) + 1)}
                      </span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <Typography
                variant="h3"
                component={motion.div}
                variants={glitchEffect}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                sx={{
                  fontFamily: '"Share Tech Mono", monospace',
                  fontWeight: 'bold',
                  textShadow: '0 0 10px #00ff41',
                  mb: 1,
                  color: '#00ff41',
                }}
              >
                {displayedName}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  style={{ color: '#00ff41' }}
                >
                  {typingComplete ? '_' : ''}
                </motion.span>
              </Typography>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: fullText.length * 0.1 + 0.5, duration: 0.5 }}
              >
                <Chip
                  label={role}
                  icon={<Security sx={{ color: '#00ff41' }} />}
                  sx={{
                    bgcolor: 'transparent',
                    color: '#00ff41',
                    border: '1px solid #00ff41',
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: '1.1rem',
                    py: 1.5,
                    px: 2,
                    '& .MuiChip-icon': {
                      ml: 0,
                    },
                  }}
                />
              </motion.div>
            </Box>
            
          </Box>
        </Grid>
        
        {/* Right Side - Details and Social Links */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'center',
            }}
          >
            {/* Description with animated border */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              style={{
                position: 'relative',
                padding: '1.5rem',
                marginBottom: '2rem',
                border: '1px solid rgba(0, 255, 65, 0.3)',
                borderRadius: '4px',
                background: 'rgba(0, 30, 15, 0.2)',
              }}
            >
              <Box
                component={motion.div}
                animate={{
                  boxShadow: ['0 0 10px #00ff41', '0 0 20px #00ff41', '0 0 10px #00ff41'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                sx={{
                  position: 'absolute',
                  top: -1,
                  left: -1,
                  right: -1,
                  bottom: -1,
                  border: '1px solid transparent',
                  borderRadius: '4px',
                  pointerEvents: 'none',
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Courier New", monospace',
                  lineHeight: 1.8,
                  color: '#b3ffb3',
                }}
              >
                {data?.description}
              </Typography>
            </motion.div>
            
            {/* Contact Info */}
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              sx={{
                mb: 4,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Share Tech Mono", monospace',
                  color: '#00ff9d',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: '10px',
                    height: '10px',
                    bgcolor: '#00ff41',
                    display: 'inline-block',
                    borderRadius: '50%',
                    mr: 1,
                  }}
                />
                CONTACT CHANNELS
              </Typography>
              
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)' },
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Email sx={{ color: '#00ff9d' }} />
                  <Typography
                    variant="body2"
                    component="a"
                    href={`mailto:${email}`}
                    sx={{
                      color: '#b3ffb3',
                      textDecoration: 'none',
                      '&:hover': { color: '#00ff41' },
                    }}
                  >
                    {email}
                  </Typography>
                </Box>
                
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Phone sx={{ color: '#00ff9d' }} />
                  <Typography
                    variant="body2"
                    component="a"
                    href={`tel:${phone}`}
                    sx={{
                      color: '#b3ffb3',
                      textDecoration: 'none',
                      '&:hover': { color: '#00ff41' },
                    }}
                  >
                    {phone}
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            {/* Social Links */}
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Share Tech Mono", monospace',
                  color: '#00ff9d',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: '10px',
                    height: '10px',
                    bgcolor: '#00ff41',
                    display: 'inline-block',
                    borderRadius: '50%',
                    mr: 1,
                  }}
                />
                SECURE CONNECTIONS
              </Typography>
              
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                {socialLinks.map((link, index) => (
                  link.url && (
                    <Tooltip 
                      key={index} 
                      title={link.label} 
                      arrow
                      componentsProps={{
                        tooltip: {
                          sx: {
                            bgcolor: '#001a0d',
                            border: '1px solid #00ff41',
                            fontFamily: '"Courier New", monospace',
                          },
                        },
                        arrow: {
                          sx: {
                            color: '#00ff41',
                          },
                        },
                      }}
                    >
                      <motion.div
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: '0 0 15px currentColor',
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconButton
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: '#00ff41',
                            border: '1px solid',
                            borderImage: 'linear-gradient(135deg, #00ff41, #00c973) 1',
                            bgcolor: 'rgba(0, 255, 65, 0.05)',
                            '&:hover': {
                              bgcolor: 'rgba(0, 255, 65, 0.1)',
                            },
                            width: 50,
                            height: 50,
                          }}
                        >
                          {link.icon}
                        </IconButton>
                      </motion.div>
                    </Tooltip>
                  )
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      
  
    </Box>
  );
};

export default PersonalDetails;