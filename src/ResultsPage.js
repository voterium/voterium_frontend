import React, { useState, useEffect, useRef } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { votingApi } from './api';

function Results() {
  const [results, setResults] = useState([]);
  const fetchCalledRef = useRef(false);

  useEffect(() => {
    if (fetchCalledRef.current) return;
    fetchCalledRef.current = true;

    const fetchResults = async () => {
      try {
        const response = await votingApi.get('/voting/results');
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