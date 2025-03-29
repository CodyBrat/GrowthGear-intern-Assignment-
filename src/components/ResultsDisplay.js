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
  Alert 
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
  Cell
} from 'recharts';

const ResultsDisplay = () => {
  const results = useSelector(selectResults);
  const isProcessing = useSelector(selectIsProcessing);
  const error = useSelector(selectError);

  // Show loading state
  if (isProcessing) {
    return (
      <Paper sx={{ p: 3, mt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5 }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2, color: '#4b5563' }}>
            Processing your query...
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: '#6b7280' }}>
            Our AI is analyzing your request
          </Typography>
        </Box>
      </Paper>
    );
  }

  // Show error state
  if (error) {
    return (
      <Paper sx={{ p: 3, mt: 2 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Typography variant="body1">
          Please try rephrasing your query or try one of the example queries.
        </Typography>
      </Paper>
    );
  }

  // Show empty state
  if (!results) {
    return (
      <Paper sx={{ p: 3, mt: 2, bgcolor: '#f9fafb' }}>
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6" sx={{ color: '#4b5563' }}>
            Ask a business question to see insights
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: '#6b7280' }}>
            Use natural language to query your data
          </Typography>
        </Box>
      </Paper>
    );
  }

  // Render chart based on results type
  const renderChart = () => {
    const { type, datasets, labels, title } = results;

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
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {datasets.map((dataset, index) => (
                <Bar 
                  key={index} 
                  dataKey={dataset.label} 
                  fill={dataset.backgroundColor || `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`} 
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
                  fill="#8884d8"
                  dataKey="value"
                >
                  {labels.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={Array.isArray(dataset.backgroundColor) 
                        ? dataset.backgroundColor[index] 
                        : `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`} 
                    />
                  ))}
                </Pie>
              ))}
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={labels.map((label, index) => {
                const dataPoint = { name: label };
                datasets.forEach(dataset => {
                  dataPoint[dataset.label] = dataset.data[index];
                });
                return dataPoint;
              })}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {datasets.map((dataset, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={dataset.label}
                  stroke={dataset.borderColor || `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
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
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        {results.title}
      </Typography>
      
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, fontStyle: 'italic' }}>
        Query: "{results.query}"
      </Typography>
      
      <Box sx={{ width: '100%' }}>
        {renderChart()}
      </Box>
      
      {results.timestamp && (
        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 2, display: 'block', textAlign: 'right' }}>
          Generated on: {new Date(results.timestamp).toLocaleString()}
        </Typography>
      )}
    </Paper>
  );
};

export default ResultsDisplay; 