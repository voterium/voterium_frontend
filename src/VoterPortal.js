import React, { useState, useEffect } from 'react';
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Paper,
  Box,
  Grid2
} from '@mui/material';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


import { votingApi } from './api';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function VoterPortal() {
  const [choice, setChoice] = useState('Option 1');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await votingApi.post('/voting/vote', { choice });
      const voteId = response.data.vote_id;
      setMessage(
        <>
          <Divider variant="middle" />
          <br />
          <Alert severity="success">Your vote has been submitted successfully.</Alert>
          <br/>
          <Typography variant="body1" gutterBottom>
            <strong>Vote ID:</strong> <code>{voteId}</code>
          </Typography>
          <Typography variant="body2" gutterBottom>
            Please record your Vote ID now, as it will not be displayed again. Use it to verify your vote in the Public Vote Verification Ledger.
          </Typography>
        </>
      );
    } catch (error) {
      setMessage('Failed to submit vote.');
    }
  };

  if (!isLoggedIn) {
    return (
      <Typography variant="h6">
        Please <a href="/login">log in</a> to vote.
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Voter Portal
      </Typography>
      <Grid2 container spacing={4}>
        {/* Voting Form */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h5" gutterBottom>
                Cast Your Vote
              </Typography>
              <RadioGroup
                value={choice}
                onChange={(e) => setChoice(e.target.value)}
              >
                <FormControlLabel
                  value="Option 1"
                  control={<Radio />}
                  label="Option 1"
                />
                <FormControlLabel
                  value="Option 2"
                  control={<Radio />}
                  label="Option 2"
                />
                <FormControlLabel
                  value="Option 3"
                  control={<Radio />}
                  label="Option 3"
                />
                <FormControlLabel
                  value="Option 4"
                  control={<Radio />}
                  label="Option 4"
                />
              </RadioGroup>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Submit Vote
              </Button>
            </form>
            {message && <Box mt={2}>{message}</Box>}
          </Paper>
        </Grid2>

        {/* Instructions */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <InfoOutlinedIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Important Information</Typography>
            </Box>
            <Typography variant="body2" gutterBottom>
              <p>
                <strong>
                  You can recast your vote
                </strong><
                  br />
                You can vote multiple times, but only your most recent vote
                counts.
              </p>
            </Typography>
            <Typography variant="body2" gutterBottom>
              <p>
                <strong>
                  Keep your Vote ID secure
                </strong><br />
                After submitting your vote, you will receive a unique Vote ID.
                This is your receipt to verify your vote was counted. Please
                record it securely, as it will not be displayed again or stored
                within Voterium.
              </p>
            </Typography>
            <Typography variant="body2" gutterBottom>
              <p>
                <strong>Verify your vote</strong>
                <br />
                To confirm your vote was successfully submitted and counted, you
                can search for your Vote ID in the Public Vote Verification
                Ledger.
              </p>
            </Typography>
            <Typography variant="body2">
              <p>
                <strong>Secure and anonymous</strong>
                <br />
                No one can determine how you
                voted (or if you voted) unless you share your Vote ID.
              </p>
            </Typography>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
}

export default VoterPortal;
