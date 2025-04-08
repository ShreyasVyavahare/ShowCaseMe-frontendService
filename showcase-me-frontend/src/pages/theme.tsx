import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00ff41',
    },
    secondary: {
      main: '#00ff41',
    },
    background: {
      default: '#000',
      paper: '#111',
    },
    text: {
      primary: '#00ff41',
      secondary: '#00ff41',
    },
  },
  typography: {
    fontFamily: '"Courier New", monospace',
    allVariants: {
      color: '#00ff41',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: '1px solid #00ff41',
          color: '#00ff41',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 65, 0.1)',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#00ff41',
        },
      },
    },
  },
});

export default theme;