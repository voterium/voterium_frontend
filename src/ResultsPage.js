import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { votingApi } from './api';

function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await votingApi.get('/results');
        setResults(response.data);
      } catch (error) {
        console.error('Failed to fetch results:', error);
      }
    };

    fetchResults();
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Voting Results
      </Typography>
      <List>
        {results.map((result) => (
          <ListItem key={result.choice}>
            <ListItemText primary={`${result.choice}: ${result.count}`} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default Results;
