import React from 'react';
import { Box, Typography, Link, Container, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <Box
      sx={{
        borderRadius:'12px',
        width: '100%',
        mt: 6,
        background: darkMode ? 'linear-gradient(135deg, #1a1a1a 0%, #2d1a4d 100%)' : 'linear-gradient(135deg, #2BC0E4 0%, #EAECC6 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        position: 'relative',
        bottom: 0,
      }}
    >
      <Container maxWidth={false} sx={{ py: 4 }}>
        <Box sx={{ 
          textAlign: 'center',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
          }
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2,
              background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold'
            }}
          >
            Created with <FavoriteIcon sx={{ 
              mx: 0.5, 
              fontSize: '1.2rem',
              color: '#f43f5e',
              animation: 'pulse 1.5s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.2)' },
                '100%': { transform: 'scale(1)' },
              }
            }} /> by
          </Typography>

          <Typography variant="body1" sx={{ mb: 3, fontWeight: 500 }}>
            <Link 
              href="https://showkaseme.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              sx={{ 
                color: 'primary.main',
                textDecoration: 'none',
                position: 'relative',
                fontWeight: 'bold',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  bottom: -2,
                  left: 0,
                  backgroundColor: 'primary.main',
                  transform: 'scaleX(0)',
                  transformOrigin: 'bottom right',
                  transition: 'transform 0.3s ease-out'
                },
                '&:hover::after': {
                  transform: 'scaleX(1)',
                  transformOrigin: 'bottom left'
                }
              }}
            >
              Showcaseme
            </Link>
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: 1
          }}>
            <Typography variant="body1" sx={{ fontWeight: 500  ,color: darkMode ? 'text.primary' : 'text.secondary' }}>
              Developed by
            </Typography>
            <Link 
              href="https://www.linkedin.com/in/shreyas-vyavahare-088096216/" 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{ 
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: 'secondary.main'
                }
              }}
            >
              Shreyas Vyavahare
            </Link>
          </Box>

          <Box sx={{ mt: 2 }}>
            <IconButton 
              href="https://www.linkedin.com/in/shreyas-vyavahare-088096216/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                mx: 1,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  color: '#0077b5'
                }
              }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton 
              href="https://github.com/ShreyasVyavahare"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                mx: 1,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  color: '#333'
                }
              }}
            >
              <GitHubIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;