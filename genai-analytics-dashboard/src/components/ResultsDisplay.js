import React from 'react';
import { useSelector } from 'react-redux';
import { 
  selectResults, 
  selectIsProcessing, 
  selectError
} from '../features/query/querySlice';
import { 
  Paper, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  Chip,
  Skeleton,
  useTheme,
  Divider
} from '@mui/material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InsightsIcon from '@mui/icons-material/Insights';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Function to get the chart icon based on chart type
const getChartIcon = (type) => {
  switch (type) {
    case 'pie':
      return <PieChartIcon />;
    case 'bar':
      return <BarChartIcon />;
    case 'line':
      return <ShowChartIcon />;
    default:
      return <InsightsIcon />;
  }
};

const ResultsDisplay = () => {
  const theme = useTheme();
  const results = useSelector(selectResults);
  const isProcessing = useSelector(selectIsProcessing);
  const error = useSelector(selectError);

  // Show loading state
  if (isProcessing) {
    return (
      <Paper 
        elevation={2} 
        sx={{ 
          p: 4, 
          mt: 2, 
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
          <Box sx={{ position: 'relative', mb: 4 }}>
            <CircularProgress 
              size={60} 
              thickness={4} 
              sx={{ 
                color: theme.palette.primary.main,
                animationDuration: '1s'
              }} 
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <InsightsIcon sx={{ color: theme.palette.grey[300], fontSize: 28 }} />
            </Box>
          </Box>
          <Typography variant="h6" sx={{ mb: 1, color: theme.palette.grey[800], fontWeight: 600 }}>
            Processing your query...
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: theme.palette.grey[600] }}>
            Our AI is analyzing your request and preparing insights
          </Typography>
          
          <Box sx={{ width: '100%', maxWidth: 600 }}>
            <Skeleton animation="wave" height={40} width="80%" sx={{ mb: 1 }} />
            <Skeleton animation="wave" height={20} width="60%" sx={{ mb: 3 }} />
            <Skeleton animation="wave" variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
          </Box>
        </Box>
      </Paper>
    );
  }

  // Show error state
  if (error) {
    return (
      <Paper 
        elevation={2} 
        sx={{ 
          p: 4, 
          mt: 2, 
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          border: `1px solid ${theme.palette.error.light}`,
          bgcolor: theme.palette.error.light + '08'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <ErrorOutlineIcon 
            sx={{ 
              color: theme.palette.error.main, 
              fontSize: 28, 
              mr: 2,
              mt: 0.5
            }} 
          />
          <Box>
            <Typography variant="h6" sx={{ mb: 1, color: theme.palette.error.dark }}>
              Query Error
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: theme.palette.error.dark }}>
              {error}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.grey[700] }}>
              Please try rephrasing your query or try one of the example queries above.
            </Typography>
          </Box>
        </Box>
      </Paper>
    );
  }

  // Show empty state
  if (!results) {
    return (
      <Paper 
        elevation={2} 
        sx={{ 
          p: 0,
          mt: 2, 
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          border: `1px solid ${theme.palette.grey[200]}`
        }}
      >
        <Box 
          sx={{ 
            bgcolor: theme.palette.grey[50], 
            p: 3, 
            borderBottom: `1px solid ${theme.palette.divider}` 
          }}
        >
          <Typography variant="h6" sx={{ color: theme.palette.grey[800], fontWeight: 600 }}>
            Data Visualization
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.grey[600] }}>
            Your results will appear here
          </Typography>
        </Box>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 8,
            textAlign: 'center',
            backgroundImage: `radial-gradient(${theme.palette.grey[100]} 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}
        >
          <InsightsIcon 
            sx={{ 
              fontSize: 60, 
              color: theme.palette.grey[300], 
              mb: 2 
            }} 
          />
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: theme.palette.grey[800] }}>
            Ask a business question to see insights
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.grey[600], maxWidth: 450 }}>
            Use natural language to query your data and get beautiful visualizations instantly
          </Typography>
        </Box>
      </Paper>
    );
  }

  // Render chart based on results type
  const renderChart = () => {
    const { type, datasets, labels, title } = results;
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
    ];

    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={labels.map((label, index) => {
                const dataPoint = { name: label };
                datasets.forEach(dataset => {
                  dataPoint[dataset.label] = dataset.data[index];
                });
                return dataPoint;
              })}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.grey[200]} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                axisLine={{ stroke: theme.palette.grey[300] }}
              />
              <YAxis 
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                axisLine={{ stroke: theme.palette.grey[300] }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 8,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: 'none'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: 15 }} />
              {datasets.map((dataset, index) => (
                <Bar 
                  key={index} 
                  dataKey={dataset.label} 
                  fill={dataset.backgroundColor || colors[index % colors.length]} 
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              {datasets.map((dataset, datasetIndex) => (
                <Pie
                  key={datasetIndex}
                  data={labels.map((label, index) => ({
                    name: label,
                    value: dataset.data[index]
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  stroke={theme.palette.background.paper}
                  strokeWidth={2}
                  dataKey="value"
                >
                  {labels.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={Array.isArray(dataset.backgroundColor) 
                        ? dataset.backgroundColor[index] 
                        : colors[index % colors.length]} 
                    />
                  ))}
                </Pie>
              ))}
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 8,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: 'none'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: 15 }} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={labels.map((label, index) => {
                const dataPoint = { name: label };
                datasets.forEach(dataset => {
                  dataPoint[dataset.label] = dataset.data[index];
                });
                return dataPoint;
              })}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <defs>
                {datasets.map((dataset, index) => (
                  <linearGradient key={index} id={`colorGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop 
                      offset="5%" 
                      stopColor={dataset.borderColor || colors[index % colors.length]} 
                      stopOpacity={0.2}
                    />
                    <stop 
                      offset="95%" 
                      stopColor={dataset.borderColor || colors[index % colors.length]} 
                      stopOpacity={0}
                    />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.grey[200]} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                axisLine={{ stroke: theme.palette.grey[300] }}
              />
              <YAxis 
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                axisLine={{ stroke: theme.palette.grey[300] }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 8,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: 'none'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: 15 }} />
              {datasets.map((dataset, index) => (
                <React.Fragment key={index}>
                  <Area
                    type="monotone"
                    dataKey={dataset.label}
                    stroke={dataset.borderColor || colors[index % colors.length]}
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                    fillOpacity={1}
                    fill={`url(#colorGradient${index})`}
                  />
                </React.Fragment>
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
            Unsupported chart type
          </Typography>
        );
    }
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 0, 
        mt: 2, 
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        border: `1px solid ${theme.palette.grey[200]}`
      }}
    >
      <Box 
        sx={{ 
          bgcolor: theme.palette.grey[50], 
          p: 3, 
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {getChartIcon(results.type)}
          <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
            {results.title}
          </Typography>
        </Box>
        <Chip 
          icon={<CheckCircleIcon sx={{ fontSize: '1rem !important' }} />}
          color="success" 
          size="small" 
          label="Analysis Complete" 
          sx={{ height: 24 }}
        />
      </Box>
      
      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              fontStyle: 'italic',
              bgcolor: theme.palette.grey[50],
              py: 0.5,
              px: 2,
              borderRadius: 20,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            Query: "{results.query}"
          </Typography>
        </Box>
        
        <Box sx={{ width: '100%', mb: 3 }}>
          {renderChart()}
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {results.timestamp && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: theme.palette.text.secondary,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
              Generated on: {new Date(results.timestamp).toLocaleString()}
            </Typography>
          )}
          
          <Chip 
            label={`${results.type} chart`} 
            size="small"
            icon={getChartIcon(results.type)}
            sx={{ 
              bgcolor: theme.palette.grey[100],
              color: theme.palette.text.primary,
              '& .MuiSvgIcon-root': {
                fontSize: '0.875rem'
              }
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default ResultsDisplay; 