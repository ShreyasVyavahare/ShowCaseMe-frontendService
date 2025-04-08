import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Grid,
  Chip,
  Avatar,

} from '@mui/material';
import {

  Terminal,
  Security,
  DeveloperMode,

} from '@mui/icons-material';

interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description?: string;
}

const ExperienceCard: React.FC<{ exp: Experience; index: number }> = ({ exp, index }) => {


  const isPresent = exp.endDate === null;

  const getRandomColor = () => {
    const colors = ['#00ff41', '#03a062', '#00c973', '#0aff6f', '#00ff9d'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Grid item xs={12} sm={6}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Box
          sx={{
            bgcolor: 'rgba(0, 20, 10, 0.3)',
            border: '1px solid rgba(0, 255, 65, 0.3)',
            borderRadius: '4px',
            p: 3,
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              boxShadow: '0 0 20px rgba(0, 255, 65, 0.2)',
              '&:before': {
                opacity: 0.3,
              }
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: `linear-gradient(90deg, ${getRandomColor()}, ${getRandomColor()})`,
              transition: 'opacity 0.3s ease',
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, transparent 60%, rgba(0, 255, 65, 0.05))`,
              pointerEvents: 'none',
            }
          }}
        >
          <Box
            component={motion.div}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(transparent 70%, rgba(0, 255, 65, 0.1))`,
              pointerEvents: 'none',
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: 'rgba(0, 255, 65, 0.1)',
                color: '#00ff41',
                width: 50,
                height: 50,
                border: '1px solid rgba(0, 255, 65, 0.5)',
              }}
            >
              <DeveloperMode />
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Share Tech Mono", monospace',
                  color: '#00ff41',
                  lineHeight: 1.2,
                }}
              >
                {exp.role}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: '"Share Tech Mono", monospace',
                  color: '#0aff6f',
                }}
              >
                {exp.company}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Chip
              label={new Date(exp.startDate).getFullYear()}
              size="small"
              sx={{
                bgcolor: 'rgba(0, 255, 65, 0.1)',
                color: '#00ff41',
                fontFamily: '"Courier New", monospace',
              }}
            />
            <Box sx={{ color: '#00ff41' }}>—</Box>
            <Chip
              label={isPresent ? 'Present' : new Date(exp.endDate || '').getFullYear()}
              size="small"
              sx={{
                bgcolor: 'rgba(0, 255, 65, 0.1)',
                color: isPresent ? '#00ff41' : '#00c973',
                fontFamily: '"Courier New", monospace',
              }}
            />
            {isPresent && (
              <Chip
                label="ACTIVE"
                size="small"
                sx={{
                  bgcolor: 'rgba(0, 255, 65, 0.2)',
                  color: '#00ff41',
                  fontFamily: '"Courier New", monospace',
                  ml: 1,
                }}
              />
            )}
          </Box>

          <Typography
            variant="body2"
            sx={{
              fontFamily: '"Courier New", monospace',
              color: '#b3ffb3',
              lineHeight: 1.6,
              mb: 2,
            }}
          >
            {exp.description || 'Classified operational details. Security clearance required for full access.'}
          </Typography>

       
        </Box>
      </motion.div>
    </Grid>
  );
};

interface ExperienceSectionProps {
  data: {
    experience: Experience[];
  };
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ data }) => {


  const experiences = data?.experience || [];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          variant="h3"
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          sx={{
            fontFamily: '"Share Tech Mono", monospace',
            color: '#00ff41',
            mb: 6,
            textAlign: 'center',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #00ff41, transparent)',
            }
          }}
        >
          <Terminal sx={{ fontSize: 'inherit', verticalAlign: 'middle', mr: 2 }} />
          MISSION ARCHIVE
          <Security sx={{ fontSize: 'inherit', verticalAlign: 'middle', ml: 2 }} />
        </Typography>

        <Grid container spacing={4}>
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </Grid>

        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          sx={{
            textAlign: 'center',
            mt: 6,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: '"Courier New", monospace',
              color: 'rgba(0, 255, 65, 0.7)',
            }}
          >
            // ACCESS LEVEL 3 REQUIRED FOR ADDITIONAL OPERATIONS //
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ExperienceSection;