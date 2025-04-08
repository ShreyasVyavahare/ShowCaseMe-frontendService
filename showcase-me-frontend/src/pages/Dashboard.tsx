import { useState, useEffect } from 'react';
import { 
  Button, TextField, Box, Typography, IconButton,
  Card, CardContent, Container, Grid, Paper,

  styled,
  Tooltip,
  useTheme,
  Fade,
  Chip,
  Divider,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { savePortfolio, getFormData } from '../services/portfolioService';
import { setPortfolio } from '../features/portfolioSlice';
import { useDispatch } from 'react-redux';
import { getUserData } from '../services/portfolioService';
import { uploadProfileImage ,uploadProjectImage ,uploadResumePdf } from '../services/portfolioService';
import { CameraAlt } from '@mui/icons-material';
import { motion } from 'framer-motion';

import template1Image from "../assets/template1.png"
import template2Image from "../assets/template2.png"
interface FormState {
  personalDetails: {
    name: string;
    email: string;
    phone: string;
    linkedinURL: string;
    instagramURL: string;
    githubURL: string;
    profileImageURL: string;
    resumeDriveLink : string;
    role: string;
    
   


  };
  skills: string[];
  softSkills: string[];
    languages: string[];
  experience: { company: string; role: string; startDate: string ,endDate: string }[];
  projects: { name: string; description: string; link: string ,projectImage: string}[];
  education: { institution: string; degree: string; startDate:string ,endDate: string }[];
  certifications: { name: string; organization: string; year: string }[];
  description: string;
  templateId: string;

}

const Dashboard = () => {
  const [userdata, setUserdata] = useState<any>(null);
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
const [uploadError, setUploadError] = useState('');
const [openTemplate1, setOpenTemplate1] = useState(false);
const [openTemplate2, setOpenTemplate2] = useState(false);
  const [form, setForm] = useState<FormState>({
    personalDetails: {
      name: '',
      email: '',
      phone: '',
      linkedinURL: '',
      instagramURL: '',
        githubURL: '',
        profileImageURL: '',
        resumeDriveLink: '',
        role: '',
    },
    skills: [''],
    softSkills: [''],
    languages: [''],
    experience: [{ company: '', role: '', startDate: '' ,endDate: '' }],
    projects: [{ name: '', description: '', link: '' ,projectImage : ''}],
    education: [{ institution: '', degree: '', startDate: '' ,endDate: '' }],
    certifications: [{ name: '', organization: '', year: '' }],
    description: '',
    templateId : ""
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserdata(data);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFormData();
        setForm(data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchData();
  }, []);

  const [projectUploadStates, setProjectUploadStates] = useState<{
    [key: number]: { isUploading: boolean; error: string };
  }>({});

  // Add this new handler
  const handleProjectImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    projectIndex: number
) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProjectUploadStates(prev => ({
        ...prev,
        [projectIndex]: { isUploading: true, error: '' }
    }));

    try {
        const imageUrl = await uploadProjectImage(file, projectIndex);
        setForm(prev => ({
            ...prev,
            projects: prev.projects.map((project, i) =>
                i === projectIndex ? { ...project, projectImage: imageUrl } : project
            )
        }));
    } catch (err) {
        setProjectUploadStates(prev => ({
            ...prev,
            [projectIndex]: {
                isUploading: false,
                error: err instanceof Error ? err.message : 'Failed to upload image'
            }
        }));
    } finally {
        setProjectUploadStates(prev => ({
            ...prev,
            [projectIndex]: { ...prev[projectIndex], isUploading: false }
        }));
    }
};


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    setIsUploading(true);
    setUploadError('');
  
    try {
      const imageUrl = await uploadProfileImage(file);
      setForm(prev => ({
        ...prev,
        personalDetails: {
          ...prev.personalDetails,
          profileImageURL: imageUrl
        }
      }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setUploadError('');
    try {
      const resume = await uploadResumePdf(file);
      setForm(prev => ({
        ...prev,
        personalDetails: {
          ...prev.personalDetails,
          resumeDriveLink: resume
        }
      }));
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : 'Failed to upload resume');
        } finally {
          setIsUploading(false);
        }
        };

  const handlePersonalDetailsChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [name]: value }
    }));
    
    if (name === 'email') validateEmail(value);
    if (name === 'phone') validatePhone(value);

  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors(prev => ({
      ...prev,
      email: emailRegex.test(email) ? '' : 'Invalid email address'
    }));
  };


  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    setErrors(prev => ({
      ...prev,
      phone: phoneRegex.test(phone) ? '' : 'Phone number must be exactly 10 digits',
    }));
  };

  const handleArrayFieldChange = (field: keyof FormState, index: number, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field]) ? prev[field].map((item: any, i: number) => i === index ? value : item) : prev[field]
    }));
  };

  const handleObjectArrayFieldChange = (field: keyof FormState, index: number, key: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field]) ? prev[field].map((item: any, i: number) => 
        i === index ? { ...item, [key]: value } : item
      ) : prev[field]
    }));
    
  };

  const addArrayField = (field: keyof FormState) => {
    setForm(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[]), field === 'skills' || field === 'softSkills' || field === 'languages' ? '' : getEmptyObject(field)]
    }));
  };


  

  const removeArrayField = (field: keyof FormState, index: number) => {
    setForm(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field]) ? prev[field].filter((_, i) => i !== index) : prev[field]
    }));
  };


  const getEmptyObject = (field: string) => {
    const emptyObjects = {
      experience: { company: '', role: '', duration: '' },
      projects: { name: '', description: '', link: '' },
      education: { institution: '', degree: '', year: '' },
      certifications: { name: '', organization: '', year: '' }
    };
    return emptyObjects[field as keyof typeof emptyObjects];
  };

  const handleSubmit = async () => {
    console.log('Form submitted:', form);
    const savedPortfolio = await savePortfolio(form);
    dispatch(setPortfolio(savedPortfolio));
    alert("Portfolio saved!");
  };
  // Removed duplicate declaration of StatBox

  const portfolioUrl = `${window.location.origin}/portfolio/${userdata?.username}`;

  const StatBox = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius * 2,
    background: `linear-gradient(135deg, ${theme.palette.primary.light}10, ${theme.palette.secondary.light}10)`,
    boxShadow: theme.shadows[4],
    transition: 'all 0.3s ease-in-out',
    border: `1px solid ${theme.palette.divider}`,
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: theme.shadows[8],
      background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
    },
  }));
  const theme = useTheme();
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Welcome {userdata?.username}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Summary Section */}
        <Box sx={{ py: 4 }}>
      {/* Stats Section */}
      <Fade in timeout={800}>
        <Paper 
          elevation={6} 
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 3, 
            background: theme.palette.background.paper,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '4px',
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              fontWeight: 600, 
              color: theme.palette.text.primary,
              mb: 3,
            }}
          >
            Your Portfolio Stats
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {[
              { label: 'Skills', count: form.skills.length, color: 'primary' },
              { label: 'Experience', count: form.experience.length, color: 'secondary' },
              { label: 'Projects', count: form.projects.length, color: 'info' },
              { label: 'Education', count: form.education.length, color: 'success' },
              { label: 'Certifications', count: form.certifications.length, color: 'warning' },
            ].map((stat, index) => (
              <Grid item xs={6} sm={4} md={2.4} key={stat.label}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <StatBox>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: "", 
                        fontWeight: 500,
                        mb: 1,
                      }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        color: theme.palette.text.primary, 
                        fontWeight: 700,
                      }}
                    >
                      {stat.count}
                    </Typography>
                  </StatBox>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Fade>

      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            color: theme.palette.primary.main,
            mb: 1,
            letterSpacing: 0.5,
          }}
        >
          Create Your Personalized Portfolio
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: theme.palette.text.secondary, 
            maxWidth: 600, 
            mx: 'auto',
            mb: 2,
          }}
        >
          Fill in your details to build a stunning portfolio with our ready-made user interface.
        </Typography>
        <Chip
          label="Beta Version"
          color="warning"
          variant="outlined"
          sx={{
            fontWeight: 500,
            borderRadius: 1,
            '& .MuiChip-label': {
              px: 2,
            },
          }}
        />
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            mt: 1, 
            color: theme.palette.text.secondary,
          }}
        >
          This is a beta version; some bugs may be present and will be resolved soon.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4, borderColor: theme.palette.divider }} />
    </Box>
        {/* Personal Details */}
        <Card>
  <CardContent>
    <Typography variant="h5" gutterBottom>Personal Details</Typography>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={form.personalDetails.name}
          onChange={handlePersonalDetailsChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={form.personalDetails.email}
          onChange={handlePersonalDetailsChange}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={form.personalDetails.phone}
          onChange={handlePersonalDetailsChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={form.description}
          onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Role"
          name="role" // Changed from "Role" to "role"
          value={form.personalDetails.role}
          onChange={handlePersonalDetailsChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="linkedinURL"
          name="linkedinURL"
          value={form.personalDetails.linkedinURL}
          onChange={handlePersonalDetailsChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="instagramURL"
          name="instagramURL"
          value={form.personalDetails.instagramURL}
          onChange={handlePersonalDetailsChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="githubURL"
          name="githubURL"
          value={form.personalDetails.githubURL}
          onChange={handlePersonalDetailsChange}
        />
      </Grid>
<Grid item xs={12}>
  <Box display="flex" alignItems="center" gap={2}>
    <TextField
      fullWidth
      label="Profile Image URL"
      name="profileImageURL"
      value={form.personalDetails.profileImageURL}
      onChange={handlePersonalDetailsChange}
    />
    <input
      accept="image/*"
      id="profile-image-upload"
      type="file"
      style={{ display: 'none' }}
      onChange={handleImageUpload}
      disabled={isUploading}
    />
    <label htmlFor="profile-image-upload">
      <Button
        variant="outlined"
        component="span"
        startIcon={<CameraAlt />}
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </Button>
    </label>
  </Box>
  {uploadError && (
    <Typography color="error" variant="body2" mt={1}>
      {uploadError}
    </Typography>
  )}
  {form.personalDetails.profileImageURL && (
    <Box mt={2}>
      <Typography variant="body2">Preview:</Typography>
      <img 
        src={form.personalDetails.profileImageURL} 
        alt="Profile preview" 
        style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '8px' }}
      />
    </Box>
  )}
</Grid>
     {/* drive link */}
     <Grid item xs={12}>
     <Box display="flex" alignItems="center" gap={2}>
  <TextField
    fullWidth
    label="Resume Drive Link"
    name="resumeDriveLink"
    value={form.personalDetails.resumeDriveLink}
    onChange={handlePersonalDetailsChange}
  />
  <input
    accept="application/pdf"
    id="resume-upload"
    type="file"
    style={{ display: 'none' }}
    onChange={handleResumeUpload}
    disabled={isUploading}
  />
  <label htmlFor="resume-upload">
    <Button
      variant="outlined"
      component="span"
      startIcon={<CameraAlt />}
      disabled={isUploading}
    >
      {isUploading ? 'Uploading...' : 'Upload PDF'}
    </Button>
  </label>
</Box>
{uploadError && (
  <Typography color="error" variant="body2" mt={1}>
    {uploadError}
  </Typography>
)}
{form.personalDetails.resumeDriveLink && (
  <Box mt={2}>
    <Typography variant="body2">Uploaded Resume:</Typography>
    <a
      href={form.personalDetails.resumeDriveLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      View Resume
    </a>
  </Box>
)}

</Grid>

     {/* drive */}
    </Grid>
  </CardContent>
</Card>

<Card>
  <CardContent>
    <Typography variant="h5" gutterBottom>Select Template</Typography>
    <Box sx={{ mb: 4 }}>
      <FormLabel component="legend">Choose a Template</FormLabel>
      <RadioGroup
        row
        value={form.templateId}
        onChange={(e) => setForm((prev) => ({ ...prev, templateId: e.target.value }))}
      >
        <FormControlLabel value="0" control={<Radio />} label="Template 1" />
        <FormControlLabel value="1" control={<Radio />} label="Template 2" />
      </RadioGroup>

      {/* Template 1 Popup */}
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setOpenTemplate1(true)}
        sx={{ mt: 2, mr: 2 }}
      >
        Preview Template 1
      </Button>
      <Dialog open={openTemplate1} onClose={() => setOpenTemplate1(false)}>
        <DialogTitle>Template 1 Preview</DialogTitle>
        <DialogContent>
          <img
            src={template1Image} // Replace with the actual path to your template image
            alt="Template 1"
            style={{ width: '100%', height: 'auto' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTemplate1(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Template 2 Popup */}
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setOpenTemplate2(true)}
        sx={{ mt: 2 }}
      >
        Preview Template 2
      </Button>
      <Dialog open={openTemplate2} onClose={() => setOpenTemplate2(false)}>
        <DialogTitle>Template 2 Preview</DialogTitle>
        <DialogContent>
          <img
            src={template2Image} // Replace with the actual path to your template image
            alt="Template 2"
            style={{ width: '100%', height: 'auto' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTemplate2(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  </CardContent>
</Card>
        {/* Skills */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5">Skills</Typography>
              <Button startIcon={<AddIcon />} onClick={() => addArrayField('skills')}>
                Add Skill
              </Button>
            </Box>
            {form.skills.map((skill, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  value={skill}
                  onChange={(e) => handleArrayFieldChange('skills', index, e.target.value)}
                />
                <IconButton onClick={() => removeArrayField('skills', index)}>
                  <RemoveIcon />
                </IconButton>
              </Box>
            ))}
          </CardContent>
        </Card>
  {/* Soft Skills */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5">Soft Skills</Typography>
              <Button startIcon={<AddIcon />} onClick={() => addArrayField('softSkills')}>
                Add Soft Skill
              </Button>
            </Box>
            {form.softSkills.map((skill, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  value={skill}
                  onChange={(e) => handleArrayFieldChange('softSkills', index, e.target.value)}
                />
                <IconButton onClick={() => removeArrayField('softSkills', index)}>
                  <RemoveIcon />
                </IconButton>
              </Box>
            ))}
          </CardContent>
        </Card>


         {/* languages */}
         <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5">Known Languages</Typography>
              <Button startIcon={<AddIcon />} onClick={() => addArrayField('languages')}>
                Add Language
              </Button>
            </Box>
            {form.languages.map((language, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  value={language}
                  onChange={(e) => handleArrayFieldChange('languages', index, e.target.value)}
                />
                <IconButton onClick={() => removeArrayField('languages', index)}>
                  <RemoveIcon />
                </IconButton>
              </Box>
            ))}
          </CardContent>
        </Card>

         {/* Languages */}
         {/* <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5">Languages</Typography>
              <Button startIcon={<AddIcon />} onClick={() => addArrayField('languages')}>
                Add Language
              </Button>
            </Box>
            {form.languages.map((language, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  value={language}
                  onChange={(e) => handleArrayFieldChange('languages', index, e.target.value)}
                />
                <IconButton onClick={() => removeArrayField('languages', index)}>
                  <RemoveIcon />
                </IconButton>
              </Box>
            ))}
          </CardContent>
        </Card> */}

        {/* Experience */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5">Experience</Typography>
              <Button startIcon={<AddIcon />} onClick={() => addArrayField('experience')}>
                Add Experience
              </Button>
            </Box>
            {form.experience.map((exp, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Company"
                      value={exp.company}
                      onChange={(e) => handleObjectArrayFieldChange('experience', index, 'company', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Role"
                      value={exp.role}
                      onChange={(e) => handleObjectArrayFieldChange('experience', index, 'role', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
  <TextField
    fullWidth
    label="Start Date"
    type="date"
    value={exp.startDate}
    onChange={(e) => handleObjectArrayFieldChange('experience', index, 'startDate', e.target.value)}
    InputLabelProps={{
      shrink: true,
    }}
  />
</Grid>
<Grid item xs={12} md={6}>
  <TextField
    fullWidth
    label="End Date"
    type="date"
    value={exp.endDate}
    onChange={(e) => handleObjectArrayFieldChange('experience', index, 'endDate', e.target.value)}
    InputLabelProps={{
      shrink: true,
    }}
  />
</Grid>
                </Grid>
                <Button
                  startIcon={<RemoveIcon />}
                  onClick={() => removeArrayField('experience', index)}
                  sx={{ mt: 2 }}
                  color="error"
                  variant="outlined"
                >
                  Remove
                </Button>
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Projects */}
        <Card>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Projects</Typography>
        <Button startIcon={<AddIcon />} onClick={() => addArrayField('projects')}>
          Add Project
        </Button>
      </Box>
      {form.projects.map((project, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={project.name}
                onChange={(e) => handleObjectArrayFieldChange('projects', index, 'name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={project.description}
                onChange={(e) => handleObjectArrayFieldChange('projects', index, 'description', e.target.value)}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={2}>
                <TextField
                  fullWidth
                  label="Project Image URL"
                  value={project.projectImage}
                  onChange={(e) => handleObjectArrayFieldChange('projects', index, 'projectImage', e.target.value)}
                />
                <input
                  accept="image/*"
                  id={`project-image-upload-${index}`}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => handleProjectImageUpload(e, index)}
                  disabled={projectUploadStates[index]?.isUploading}
                />
                <label htmlFor={`project-image-upload-${index}`}>
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CameraAlt />}
                    disabled={projectUploadStates[index]?.isUploading}
                  >
                    {projectUploadStates[index]?.isUploading ? 'Uploading...' : 'Upload'}
                  </Button>
                </label>
              </Box>
              {projectUploadStates[index]?.error && (
                <Typography color="error" variant="body2" mt={1}>
                  {projectUploadStates[index].error}
                </Typography>
              )}
              {project.projectImage && (
                <Box mt={2}>
                  <Typography variant="body2">Preview:</Typography>
                  <img
                    src={project.projectImage}
                    alt="Project preview"
                    style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '8px' }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Link"
                value={project.link}
                onChange={(e) => handleObjectArrayFieldChange('projects', index, 'link', e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            startIcon={<RemoveIcon />}
            onClick={() => removeArrayField('projects', index)}
            sx={{ mt: 2 }}
            color="error"
            variant="outlined"
          >
            Remove
          </Button>
        </Box>
      ))}
    </CardContent>
  </Card>

        {/* Education */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5">Education</Typography>
              {/* <Button startIcon={<AddIcon />} onClick={() => addArrayField('education')}>
                Add Education
              </Button> */}
            </Box>
            {form.education.map((edu, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Institution"
                      value={edu.institution}
                      onChange={(e) => handleObjectArrayFieldChange('education', index, 'institution', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField

                      fullWidth
                      label="Degree"
                      value={edu.degree}
                      onChange={(e) => handleObjectArrayFieldChange('education', index, 'degree', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                       type="date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                          
                      label="Start Date"
                      value={edu.startDate}
                      onChange={(e) => handleObjectArrayFieldChange('education', index, 'startDate', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}

                        type="date"
                      fullWidth
                      label="End Date"
                      value={edu.endDate}
                      onChange={(e) => handleObjectArrayFieldChange('education', index, 'endDate', e.target.value)}
                    />
                  </Grid>
                </Grid>
                {/* <Button
                  startIcon={<RemoveIcon />}
                  onClick={() => removeArrayField('education', index)}
                  sx={{ mt: 2 }}
                  color="error"
                  variant="outlined"
                >
                  Remove
                </Button> */}
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5">Certifications</Typography>
              <Button startIcon={<AddIcon />} onClick={() => addArrayField('certifications')}>
                Add Certification
              </Button>
            </Box>
            {form.certifications.map((cert, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={cert.name}
                      onChange={(e) => handleObjectArrayFieldChange('certifications', index, 'name', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Organization"
                      value={cert.organization}
                      onChange={(e) => handleObjectArrayFieldChange('certifications', index, 'organization', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
  <TextField
    fullWidth
    label="Year"
    type="month"
    value={cert.year}
    onChange={(e) => handleObjectArrayFieldChange('certifications', index, 'year', e.target.value)}
    InputLabelProps={{
      shrink: true,
    }}
  />
</Grid>
                </Grid>
                <Button
                  startIcon={<RemoveIcon />}
                  onClick={() => removeArrayField('certifications', index)}
                  sx={{ mt: 2 }}
                  color="error"
                  variant="outlined"
                >
                  Remove
                </Button>
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
         
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleLogout} >
            Logout
          </Button>
        </Box>
        {userdata && (
          <Box sx={{ mt: 4 }}>
         <Typography variant="h6">
  Access your portfolio at: 
  <Tooltip title={portfolioUrl} arrow>
    <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
      {portfolioUrl.length > 30 ? `${portfolioUrl.substring(0, 30)}...` : portfolioUrl}
    </a>
  </Tooltip>
</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;