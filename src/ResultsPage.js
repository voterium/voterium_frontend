import React, { useState, useEffect, useRef } from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import { votingApi } from './api';
import { BarChart } from '@mui/x-charts/BarChart';

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2em' }}>
        <CircularProgress />
      </div>
    );
  }

  // Prepare data for BarChart
  const labels = results.map((result) => result.choice);
  const counts = results.map((result) => result.count);

  
  // // Generate colors for each bar
  const colors = [
    '#F94144',
    '#90BE6D',
    '#577590',
    '#F8961E',
    '#277DA1',
    '#F9C74F',
    '#43AA8B',
    '#4D908E',
    '#F9844A',
    '#F3722C',
  ];

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
              // label: 'Number of Votes',
              axisLine: true,
            },
          ]}
          series={[
            {
              data: counts,
            },
          ]}
          seriesColorBy="data"
          // series={series}
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