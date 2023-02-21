import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  shape: {
    borderRadius: 8
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    background: {
      default: '#E0E0E0',
      paper: '#FFFFFF'
    }
  }
});

export default theme;
