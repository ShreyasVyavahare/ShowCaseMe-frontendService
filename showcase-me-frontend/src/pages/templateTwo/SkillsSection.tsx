import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Grid,
  Chip,
  Avatar,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Code,
  School,
  WorkspacePremium,
  Psychology,
  Language
} from '@mui/icons-material';

interface SkillsSectionProps {
  data: {
    skills: string[];
    softSkills: string[];
    languages: string[];
    education: {
      institution: string;
      degree: string;
      year: string;
    }[];
    certifications: {
      name: string;
      organization: string;
      year: string;
    }[];
  };
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getRandomColor = () => {
    const colors = ['#00ff41', '#0aff6f', '#00c973', '#03a062'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const renderSkills = (skills: string[], icon: React.ReactNode, title: string, color: string) => (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            bgcolor: 'rgba(0, 20, 10, 0.3)',
            border: '1px solid rgba(0, 255, 65, 0.3)',
            borderRadius: '4px',
            minHeight: isMobile ? '200px' : '200px',
            
            p: 3,
            height: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: 'rgba(0, 255, 65, 0.1)',
                color,
                width: 40,
                height: 40,
                mr: 2,
                border: `1px solid ${color}`,
              }}
            >
              {icon}
            </Avatar>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                color: '#00ff41',
              }}
            >
              {title}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                size="small"
                sx={{
                  bgcolor: 'rgba(0, 255, 65, 0.1)',
                  color: '#00ff41',
                  fontFamily: '"Courier New", monospace',
                  border: `1px solid ${color}`,
                }}
              />
            ))}
          </Box>
        </Box>
      </motion.div>
    </Grid>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // background: 'radial-gradient(circle, rgba(0,10,5,0.9) 0%, rgba(0,0,0,1) 100%)',
        color: '#00ff41',
        p: 4,
        position: 'relative',
      }}
    >
      <Box sx={{ maxWidth: '1200px', mx: 'auto', width: '100%' }}>
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
          <Code sx={{ fontSize: 'inherit', verticalAlign: 'middle', mr: 2 }} />
          SKILLS & QUALIFICATIONS
        </Typography>

        <Grid container  spacing={4} sx={{ mb: 6 }}>
          {renderSkills(data.skills, <Code />, 'TECH SKILLS', getRandomColor())}
          {renderSkills(data.softSkills, <Psychology />, 'SOFT SKILLS', getRandomColor())}
          {renderSkills(data.languages, <Language />, 'LANGUAGES', getRandomColor())}
        </Grid>

        <Grid container spacing={4}>
          {/* Education */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box
                sx={{
                  bgcolor: 'rgba(0, 20, 10, 0.3)',
                  border: '1px solid rgba(0, 255, 65, 0.3)',
                  borderRadius: '4px',
                  p: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'rgba(0, 255, 65, 0.1)',
                      color: '#00ff41',
                      width: 40,
                      height: 40,
                      mr: 2,
                      border: '1px solid #00ff41',
                    }}
                  >
                    <School />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Share Tech Mono", monospace',
                      color: '#00ff41',
                    }}
                  >
                    EDUCATION
                  </Typography>
                </Box>

                {data.education.map((edu, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: '"Share Tech Mono", monospace',
                        color: '#0aff6f',
                        mb: 0.5,
                      }}
                    >
                      {edu.institution}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: '"Courier New", monospace',
                        color: '#b3ffb3',
                        mb: 0.5,
                      }}
                    >
                      {edu.degree}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: '"Courier New", monospace',
                        color: '#00c973',
                      }}
                    >
                      {edu.year}
                    </Typography>
                    {index < data.education.length - 1 && (
                      <Divider sx={{ borderColor: 'rgba(0, 255, 65, 0.3)', my: 2 }} />
                    )}
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Certifications */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Box
                sx={{
                  bgcolor: 'rgba(0, 20, 10, 0.3)',
                  border: '1px solid rgba(0, 255, 65, 0.3)',
                  borderRadius: '4px',
                  p: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'rgba(0, 255, 65, 0.1)',
                      color: '#00ff41',
                      width: 40,
                      height: 40,
                      mr: 2,
                      border: '1px solid #00ff41',
                    }}
                  >
                    <WorkspacePremium />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Share Tech Mono", monospace',
                      color: '#00ff41',
                    }}
                  >
                    CERTIFICATIONS
                  </Typography>
                </Box>

                {data.certifications.map((cert, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: '"Share Tech Mono", monospace',
                        color: '#0aff6f',
                        mb: 0.5,
                      }}
                    >
                      {cert.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: '"Courier New", monospace',
                        color: '#b3ffb3',
                        mb: 0.5,
                      }}
                    >
                      {cert.organization}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: '"Courier New", monospace',
                        color: '#00c973',
                      }}
                    >
                      {cert.year}
                    </Typography>
                    {index < data.certifications.length - 1 && (
                      <Divider sx={{ borderColor: 'rgba(0, 255, 65, 0.3)', my: 2 }} />
                    )}
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SkillsSection;