import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuery, selectQueryHistory } from '../features/query/querySlice';
import { 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Typography, 
  Box 
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const QueryHistory = () => {
  const dispatch = useDispatch();
  const queryHistory = useSelector(selectQueryHistory);

  const handleHistoryItemClick = (query) => {
    dispatch(setCurrentQuery(query));
  };

  if (queryHistory.length === 0) {
    return (
      <Paper sx={{ p: 2, mt: 2, bgcolor: '#f9fafb' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HistoryIcon sx={{ color: '#9ca3af', mr: 1 }} />
          <Typography variant="subtitle1" sx={{ color: '#6b7280' }}>
            Your query history will appear here
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ mt: 2 }}>
      <Box sx={{ p: 2, bgcolor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <HistoryIcon sx={{ mr: 1 }} />
          Recent Queries
        </Typography>
      </Box>
      <List>
        {queryHistory.map((query, index) => (
          <ListItem
            key={index}
            button
            onClick={() => handleHistoryItemClick(query)}
            sx={{ '&:hover': { bgcolor: '#f9fafb' }, borderBottom: '1px solid #e5e7eb' }}
          >
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText 
              primary={query}
              secondary={`Executed ${index === 0 ? 'just now' : 'earlier'}`} 
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default QueryHistory; 