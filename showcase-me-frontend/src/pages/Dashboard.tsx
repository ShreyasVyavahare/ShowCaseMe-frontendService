import { useState, useEffect } from 'react';
import { 
  Button, TextField, Box, Typography, IconButton,
  Card, CardContent, Container, Grid, Paper,
  Theme,
  styled,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { savePortfolio, getFormData } from '../services/portfolioService';
import { setPortfolio } from '../features/portfolioSlice';
import { useDispatch } from 'react-redux';
import { getUserData } from '../services/portfolioService';

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

}

const Dashboard = () => {
  const [userdata, setUserdata] = useState<any>(null);
  const dispatch = useDispatch();
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
    description: ''
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
    const phoneRegex = /^[6-9]\d{9}$/;
    setErrors(prev => ({
      ...prev,
      phone: phoneRegex.test(phone) ? '' : 'Invalid phone number'
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
  const StatBox = styled(Box)(({ theme }: { theme: Theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    boxShadow: theme.shadows[1],
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows[4],
    },
  }));

  const portfolioUrl = `${window.location.origin}/portfolio/${userdata?.username}`;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Welcome {userdata?.username}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Summary Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
    <Grid container spacing={3}>
      <Grid item xs={6} md={2}>
        <StatBox>
          <Typography variant="h6" color="primary">Skills</Typography>
          <Typography variant="h4" color="textPrimary">{form.skills.length}</Typography>
        </StatBox>
      </Grid>
      <Grid item xs={6} md={2}>
        <StatBox>
          <Typography variant="h6" color="primary">Experience</Typography>
          <Typography variant="h4" color="textPrimary">{form.experience.length}</Typography>
        </StatBox>
      </Grid>
      <Grid item xs={6} md={2}>
        <StatBox>
          <Typography variant="h6" color="primary">Projects</Typography>
          <Typography variant="h4" color="textPrimary">{form.projects.length}</Typography>
        </StatBox>
      </Grid>
      <Grid item xs={6} md={2}>
        <StatBox>
          <Typography variant="h6" color="primary">Education</Typography>
          <Typography variant="h4" color="textPrimary">{form.education.length}</Typography>
        </StatBox>
      </Grid>
      <Grid item xs={6} md={2}>
        <StatBox>
          <Typography variant="h6" color="primary">Certifications</Typography>
          <Typography variant="h4" color="textPrimary">{form.certifications.length}</Typography>
        </StatBox>
      </Grid>
    </Grid>
  </Paper>

  <Typography variant="h4">Please fill your Details to create the Personalized Portfolio with readymade User Interface</Typography>
  <Typography>This is Beta Version of application ,it may include some bugs wich will be resolved in upcoming days</Typography>

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
                  name="Role"
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
                     <TextField
                  fullWidth
                  label="profileImageURL"
                  name="profileImageURL"
                  value={form.personalDetails.profileImageURL}
                  onChange={handlePersonalDetailsChange}
                />
                </Grid>
                <Grid item xs={12}>
                     <TextField
                  fullWidth
                  label="resumeDriveLink"
                  name="resumeDriveLink"
                  value={form.personalDetails.resumeDriveLink}
                  onChange={handlePersonalDetailsChange}
                />
                </Grid>
                </Grid>
                   


             

            
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
                    <Typography variant="h6">Make sure if you have uploaded the Screenshot of image to drive </Typography>
                    <TextField
                      fullWidth
                      label="Project Image Screenshot link"
                      value={project.projectImage}
                      onChange={(e) => handleObjectArrayFieldChange('projects', index, 'projectImage', e.target.value)}
                    />
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
                      fullWidth
                          type="date"
                      label="Start Date"
                      value={edu.startDate}
                      onChange={(e) => handleObjectArrayFieldChange('education', index, 'startDate', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
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