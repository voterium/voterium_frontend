import React, { useState, useEffect } from 'react';
import { Button, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import { votingApi } from './api';

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
      setMessage(`
        <p><strong>Your vote has been submitted.</strong></p>
        <p><strong>Vote ID:</strong> <em>${voteId}</em> – please record it now as you will not have another chance to access it in Voterium.</p>
        <p>You can verify that your vote was correctly recorded by finding your <strong>Vote ID</strong> in the <em>Public Vote Verification Ledger</em>.</p>
      `);
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
      <form onSubmit={handleSubmit}>
        <Typography variant="h6">Select an Option</Typography>
        <RadioGroup value={choice} onChange={(e) => setChoice(e.target.value)}>
          <FormControlLabel value="Option 1" control={<Radio />} label="Option 1" />
          <FormControlLabel value="Option 2" control={<Radio />} label="Option 2" />
          <FormControlLabel value="Option 3" control={<Radio />} label="Option 3" />
          <FormControlLabel value="Option 4" control={<Radio />} label="Option 4" />
        </RadioGroup>
        <Button type="submit" variant="contained" color="primary">
          Submit Vote
        </Button>
      </form>
      {message && (
        <Typography style={{ marginTop: '1em' }} dangerouslySetInnerHTML={{ __html: message }} />
      )}
    </>
  );
}

export default VoterPortal;