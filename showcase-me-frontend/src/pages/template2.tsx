import  { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import PersonalDetails from './personalDetails';
import ExperienceSection from './templateTwo/ExperienceSection';
import ProjectsSection from './templateTwo/ProjectsSection';
import SkillsSection from './templateTwo/SkillsSection';
import { useParams } from 'react-router-dom';
import { fetchPortfolio } from '../services/portfolioService';
import Footer from './templateTwo/Footertwo';

export interface Portfolio {
  _id: string;
  user: string;
  certifications: {
    name: string;
    organization: string;
    year: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
    startDate: string;
    endDate: string;
  }[];
  experience: {
    company: string;
    role: string;
    duration: string;
    startDate: string;
    endDate: string | null;
  }[];
  languages: string[];
  personalDetails: {
    name: string;
    email: string;
    phone: string;
    linkedinURL: string;
    instagramURL: string;
    githubURL: string;
    profileImageURL: string;
    resumeDriveLink: string;
    role: string;
  };
  projects: {
    name: string;
    description: string;
    link: string;
    projectImage: string;
  }[];
  skills: string[];
  softSkills: string[];
  description: string;
  templateId: string;
}

const Templatetwo = () => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { username } = useParams();

  useEffect(() => {
    const getPortfolio = async () => {
      try {
        if (username) {
          const data = await fetchPortfolio(username);
          setPortfolio(data);
        } else {
          throw new Error("Username is undefined");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    getPortfolio();
  }, [username]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: 'black',
        }}
      >
        <CircularProgress sx={{ color: '#00ff41' }} />
        <Typography
          variant="h6"
          sx={{
            color: '#00ff41',
            ml: 2,
            fontFamily: '"Courier New", monospace',
          }}
        >
          LOADING DATA...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: 'black',
          color: 'red',
          fontFamily: '"Courier New", monospace',
        }}
      >
        ERROR: {error}
      </Box>
    );
  }

  if (!portfolio) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: 'black',
          color: '#00ff41',
          fontFamily: '"Courier New", monospace',
        }}
      >
        NO PORTFOLIO DATA FOUND
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: 'black',
        minHeight: '100vh',
        color: '#00ff41',
      }}
    >
      <PersonalDetails data={portfolio} />
      <ExperienceSection data={portfolio} />
      <ProjectsSection data={portfolio} />
      <SkillsSection data={portfolio} />
      <Footer />
  
    </Box>
  );
};

export default Templatetwo;