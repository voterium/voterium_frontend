import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import VoterPortal from './VoterPortal';
import ResultsPage from './ResultsPage';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Voting App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Vote
          </Button>
          <Button color="inherit" component={Link} to="/results">
            Results
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
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
  );
}

export default App;
