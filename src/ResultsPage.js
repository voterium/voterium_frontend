import React, { useState, useEffect, useRef } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import { votingApi } from './api';
import { BarChart } from '@mui/x-charts/BarChart';

function Results() {
  const [results, setResults] = useState([]);
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const effectRan = useRef(false); // Added ref

  useEffect(() => {
    if (effectRan.current) return; // Prevents the effect from running twice
    effectRan.current = true;

    // Fetch voting results
    const fetchResults = async () => {
      try {
        const response = await votingApi.get('/voting/results');
        setResults(response.data);
      } catch (error) {
        console.error('Failed to fetch results:', error);
      }
    };

    // Fetch vote config
    const fetchConfig = async () => {
      try {
        const response = await votingApi.get('/voting/config');
        setConfig(response.data);
      } catch (error) {
        console.error('Failed to fetch config:', error);
      }
    };

    Promise.all([fetchResults(), fetchConfig()]).then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2em' }}>
        <CircularProgress />
      </div>
    );
  }

  if (!results.length || !config) {
    return (
      <Typography variant="h6">
        No results available at this time.
      </Typography>
    );
  }

  // Map results to labels and counts
  const choiceMap = {};
  config.choices.forEach((choice) => {
    choiceMap[choice.key] = { label: choice.label, color: choice.color };
  });

  const labels = results.map((result) => choiceMap[result.choice]?.label || result.choice);
  const counts = results.map((result) => result.count);

  // Generate colors for each bar based on the config
  const colors = results.map((result) => choiceMap[result.choice]?.color || '#cccccc');

  // Limit the width of the chart based on the number of choices
  const chartWidth = Math.min(labels.length * 100, 600); // Adjust maximum width as needed

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Voting Results
      </Typography>
      <Box display="flex" justifyContent="left">
        <BarChart
          barLabel="value"
          xAxis={[
            {
              data: labels,
              scaleType: 'band',
              label: '', // Remove x-axis label
              tickSize: 0, // Remove x-axis tick marks
              axisLine: false, // Remove x-axis line
              colorMap: {
                type: "ordinal",
                values: labels,
                colors: colors,
              },
            },
          ]}
          yAxis={[
            {
              axisLine: true,
            },
          ]}
          series={[
            {
              data: counts,
              // color: colors,
            },
          ]}
          width={chartWidth}
          height={400}
          margin={{ top: 20, right: 0, bottom: 40, left: 0 }} // Adjust margins for better spacing
          tooltip // Enable tooltips
        />
      </Box>
    </>
  );
}

export default Results;