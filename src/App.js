import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  ThemeProvider,
  createTheme,
  Box,
} from '@mui/material';
import VoterPortal from './VoterPortal';
import ResultsPage from './ResultsPage';
import Login from './Login';
import Register from './Register';

// Define the custom theme with brand color
const theme = createTheme({
  palette: {
    primary: {
      main: '#877F94', // Voterium brand color
    },
    secondary: {
      main: '#ffffff', // For contrasting elements, adjust if needed
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static" color="primary">
          <Toolbar>
            {/* Logo */}
            <Box sx={{ flexGrow: 1 }}>
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="Voterium Logo"
                  style={{ height: '40px' }}
                />
              </Link>
            </Box>

            {/* Voter Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isLoggedIn && (
                <Button color="inherit" component={Link} to="/">
                  Vote
                </Button>
              )}
              <Button color="inherit" component={Link} to="/results">
                Results
              </Button>
            </Box>

            {/* Account Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              {isLoggedIn ? (
                <Button color="inherit" onClick={handleLogout}>
                  Log Out
                </Button>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/register">
                    Register
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: '2em' }}>
          <Routes>
            <Route path="/" element={<VoterPortal />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
