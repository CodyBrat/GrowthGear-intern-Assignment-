import React from 'react';
import { Container, Grid, Box, Typography, Paper, AppBar, Toolbar } from '@mui/material';
import QueryInput from './QueryInput';
import QueryHistory from './QueryHistory';
import ResultsDisplay from './ResultsDisplay';
import DataIcon from '@mui/icons-material/Assessment';

const Dashboard = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f3f4f6' }}>
      <AppBar position="static" sx={{ bgcolor: '#4f46e5' }}>
        <Toolbar>
          <DataIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GenAI Analytics Dashboard
          </Typography>
          <Typography variant="subtitle2">
            Make data-driven decisions with AI
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Paper sx={{ p: 3, mb: 3, bgcolor: 'white', boxShadow: 1 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            Ask Questions About Your Data
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            Use natural language to query your business data and get instant insights.
            No SQL knowledge required - our AI translates your questions into data queries.
          </Typography>
          
          <QueryInput />
        </Paper>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <QueryHistory />
          </Grid>
          
          <Grid item xs={12} md={8}>
            <ResultsDisplay />
          </Grid>
        </Grid>
      </Container>
      
      <Box sx={{ bgcolor: '#1f2937', color: 'white', py: 2, mt: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ textAlign: 'center', color: '#9ca3af' }}>
            © 2025 GenAI Analytics | AI-Powered Business Intelligence Platform
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard; 