import React from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Paper, 
  AppBar, 
  Toolbar, 
  Button, 
  useTheme,
  Link,
  Stack
} from '@mui/material';
import QueryInput from './QueryInput';
import QueryHistory from './QueryHistory';
import ResultsDisplay from './ResultsDisplay';
import DataIcon from '@mui/icons-material/Assessment';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const Dashboard = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default, display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" elevation={1} color="primary">
        <Toolbar>
          <DataIcon sx={{ mr: 2, fontSize: 28 }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            GenAI Analytics Dashboard
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit" size="small">Documentation</Button>
            <Button color="inherit" size="small">Support</Button>
            <Button variant="outlined" color="inherit" size="small" sx={{ 
              borderColor: 'rgba(255,255,255,0.5)', 
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } 
            }}>
              Upgrade Plan
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ bgcolor: theme.palette.primary.dark, color: 'white', py: 1 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            <LightbulbIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
            Pro Tip: Ask "Show me sales trends for the last 6 months" for detailed insights
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
        <Paper 
          elevation={2} 
          sx={{ 
            p: 4, 
            mb: 4, 
            bgcolor: 'white', 
            borderRadius: 3,
            backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.light}10, ${theme.palette.background.paper})`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ 
            position: 'absolute', 
            right: -50, 
            top: -50, 
            width: 200, 
            height: 200, 
            borderRadius: '50%', 
            background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}30)`,
            zIndex: 0 
          }} />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
              Ask Questions About Your Data
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', maxWidth: '800px' }}>
              Use natural language to query your business data and get instant insights.
              No SQL knowledge required - our AI translates your questions into data queries.
            </Typography>
            
            <QueryInput />
          </Box>
        </Paper>
        
        <Box sx={{ mb: 2 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
            <Paper sx={{ p: 2, flex: 1, display: 'flex', alignItems: 'center', borderLeft: `4px solid ${theme.palette.primary.main}` }}>
              <SpeedIcon sx={{ color: theme.palette.primary.main, mr: 2, fontSize: 30 }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Fast Insights</Typography>
                <Typography variant="body2" color="text.secondary">Get answers in seconds, not hours</Typography>
              </Box>
            </Paper>
            
            <Paper sx={{ p: 2, flex: 1, display: 'flex', alignItems: 'center', borderLeft: `4px solid ${theme.palette.secondary.main}` }}>
              <AutoGraphIcon sx={{ color: theme.palette.secondary.main, mr: 2, fontSize: 30 }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Data-Driven Decisions</Typography>
                <Typography variant="body2" color="text.secondary">Powered by enterprise analytics</Typography>
              </Box>
            </Paper>
          </Stack>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <QueryHistory />
          </Grid>
          
          <Grid item xs={12} md={8}>
            <ResultsDisplay />
          </Grid>
        </Grid>
      </Container>
      
      <Box sx={{ 
        bgcolor: theme.palette.grey[900], 
        color: 'white', 
        py: 4, 
        mt: 'auto',
        borderTop: `1px solid ${theme.palette.grey[800]}`
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, color: theme.palette.grey[300] }}>
                GenAI Analytics
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.grey[500], mb: 2 }}>
                The most advanced business intelligence platform with AI-powered natural language queries.
              </Typography>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: theme.palette.grey[300] }}>
                Product
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" underline="hover" sx={{ color: theme.palette.grey[500] }}>Features</Link>
                <Link href="#" color="inherit" underline="hover" sx={{ color: theme.palette.grey[500] }}>Pricing</Link>
                <Link href="#" color="inherit" underline="hover" sx={{ color: theme.palette.grey[500] }}>Roadmap</Link>
              </Stack>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: theme.palette.grey[300] }}>
                Support
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" underline="hover" sx={{ color: theme.palette.grey[500] }}>Documentation</Link>
                <Link href="#" color="inherit" underline="hover" sx={{ color: theme.palette.grey[500] }}>API Reference</Link>
                <Link href="#" color="inherit" underline="hover" sx={{ color: theme.palette.grey[500] }}>Community</Link>
              </Stack>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: theme.palette.grey[300] }}>
                Company
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" underline="hover" sx={{ color: theme.palette.grey[500] }}>About Us</Link>
                <Link href="#" color="inherit" underline="hover" sx={{ color: theme.palette.grey[500] }}>Careers</Link>
                <Link href="#" color="inherit" underline="hover" sx={{ color: theme.palette.grey[500] }}>Blog</Link>
              </Stack>
            </Grid>
            
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: theme.palette.grey[300] }}>
                Legal
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" underline="hover" sx={{ color: theme.palette.grey[500] }}>Privacy</Link>
                <Link href="#" color="inherit" underline="hover" sx={{ color: theme.palette.grey[500] }}>Terms</Link>
                <Link href="#" color="inherit" underline="hover" sx={{ color: theme.palette.grey[500] }}>Security</Link>
              </Stack>
            </Grid>
          </Grid>
          
          <Box sx={{ borderTop: `1px solid ${theme.palette.grey[800]}`, mt: 4, pt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: theme.palette.grey[600] }}>
              © 2025 GenAI Analytics | AI-Powered Business Intelligence Platform
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard; 