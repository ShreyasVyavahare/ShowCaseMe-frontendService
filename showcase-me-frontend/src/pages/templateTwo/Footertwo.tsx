
import { Box, Typography, Divider } from '@mui/material';
import { Code, Terminal, Security } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'rgba(0, 10, 5, 0.9)',
        color: '#00ff41',
        py: 4,
        px: 2,
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 255, 65, 0.3)',
      }}
    >
      {/* Animated binary code background */}
      <Box
        component={motion.div}
        animate={{
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(
              rgba(0, 255, 65, 0.02),
              transparent
            ),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 65, 0.05) 3px,
              rgba(0, 255, 65, 0.05) 4px
            )
          `,
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Animated divider */}
        <Divider
          component={motion.div}
          animate={{
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          sx={{
            width: '200px',
            height: '2px',
            bgcolor: 'rgba(0, 255, 65, 0.5)',
            mb: 3,
          }}
        />

        {/* Footer content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
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
            <Terminal sx={{ color: '#00ff41' }} />
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                color: '#00ff41',
              }}
            >
              SYSTEM STATUS: <Box component="span" sx={{ color: '#0aff6f' }}>OPERATIONAL</Box>
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Code sx={{ color: '#00ff41' }} />
            <Typography
              variant="body2"
              
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                color: '#00ff41',
                textAlign: 'center',
              }}
            >
              © {currentYear} SHOWCASEME v1.0.0
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Security sx={{ color: '#00ff41' }} />
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                color: '#00ff41',
              }}
            >
              DEVELOPED BY: <Box component="span" sx={{ color: '#0aff6f' }}>SHREYAS YAVZAHARE</Box>
            </Typography>
          </Box>
        </Box>

        {/* Animated scan line */}
        <Box
          component={motion.div}
          animate={{
            y: ['-100%', '100%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            bgcolor: 'rgba(0, 255, 65, 0.5)',
            boxShadow: '0 0 10px #00ff41',
          }}
        />
      </Box>
    </Box>
  );
};

export default Footer;