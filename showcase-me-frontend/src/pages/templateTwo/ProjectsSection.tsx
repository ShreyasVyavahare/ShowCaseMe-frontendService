import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Grid,
  Chip,

  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import {
  Code,
  
  Security,
  Close,
  GitHub,
  Public,

} from '@mui/icons-material';

interface Project {
  name: string;
  description: string;
  projectImage?: string;
  link?: string;
  githubURL?: string;
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {


  const [open, setOpen] = useState(false);

  const getRandomColor = () => {
    const colors = ['#00ff41', '#03a062', '#00c973', '#0aff6f', '#00ff9d'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Box
            onClick={handleOpen}
            sx={{
              bgcolor: 'rgba(0, 20, 10, 0.3)',
              border: '1px solid rgba(0, 255, 65, 0.3)',
              borderRadius: '4px',
              p: 3,
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: '0 0 20px rgba(0, 255, 65, 0.2)',
                '&:before': {
                  opacity: 0.3,
                },
                '& .project-image': {
                  transform: 'scale(1.05)',
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
            }}
          >
            <Box
              sx={{
                height: '180px',
                overflow: 'hidden',
                mb: 2,
                position: 'relative',
              }}
            >
              <Box
                className="project-image"
                component={motion.div}
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${project.projectImage || 'https://via.placeholder.com/400x225/111111/00ff41?text=CLASSIFIED'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.5s ease',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8))',
                }}
              />
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                color: '#00ff41',
                mb: 1,
              }}
            >
              {project.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontFamily: '"Courier New", monospace',
                color: '#b3ffb3',
                mb: 2,
                minHeight: '60px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {project.description}
            </Typography>

        
          </Box>
        </motion.div>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'rgba(0, 10, 5, 0.95)',
            border: '1px solid #00ff41',
            borderRadius: '4px',
            overflow: 'hidden',
          }
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: 'rgba(0, 20, 10, 0.5)',
            borderBottom: '1px solid rgba(0, 255, 65, 0.3)',
            fontFamily: '"Share Tech Mono", monospace',
            color: '#00ff41',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {project.name}
          <IconButton onClick={handleClose} sx={{ color: '#00ff41' }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, mb: 3 }}>
            <Box
              sx={{
                height: '300px',
                backgroundImage: `url(${project.projectImage || 'https://via.placeholder.com/800x450/111111/00ff41?text=CLASSIFIED'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '4px',
                mb: 3,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Courier New", monospace',
                color: '#b3ffb3',
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              {project.description}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                color: '#00ff41',
                mb: 1,
              }}
            >
              TECHNOLOGIES DEPLOYED:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              <Chip label="React" sx={{ bgcolor: 'rgba(0, 255, 65, 0.1)', color: '#00ff41' }} />
              <Chip label="Node.js" sx={{ bgcolor: 'rgba(0, 255, 65, 0.1)', color: '#00ff41' }} />
              <Chip label="MongoDB" sx={{ bgcolor: 'rgba(0, 255, 65, 0.1)', color: '#00ff41' }} />
              <Chip label="AWS" sx={{ bgcolor: 'rgba(0, 255, 65, 0.1)', color: '#00ff41' }} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid rgba(0, 255, 65, 0.3)', p: 2 }}>
          {project.link && (
            <Button
              startIcon={<Public />}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#00ff41',
                border: '1px solid #00ff41',
                fontFamily: '"Share Tech Mono", monospace',
                '&:hover': {
                  bgcolor: 'rgba(0, 255, 65, 0.1)',
                }
              }}
            >
              Live Demo
            </Button>
          )}
          {project.githubURL && (
            <Button
              startIcon={<GitHub />}
              href={project.githubURL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#00ff41',
                border: '1px solid #00ff41',
                fontFamily: '"Share Tech Mono", monospace',
                '&:hover': {
                  bgcolor: 'rgba(0, 255, 65, 0.1)',
                }
              }}
            >
              Source Code
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

interface ProjectsData {
  projects: Project[];
}

const ProjectsSection: React.FC<{ data: ProjectsData }> = ({ data }) => {

  const projects = data?.projects || [];

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
          <Code sx={{ fontSize: 'inherit', verticalAlign: 'middle', mr: 2 }} />
          CYBER OPERATIONS
          <Security sx={{ fontSize: 'inherit', verticalAlign: 'middle', ml: 2 }} />
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
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
            // ADDITIONAL OPERATIONS CLASSIFIED - CLEARANCE LEVEL 4 REQUIRED //
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectsSection;