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
  Box,
  Avatar,
  Divider,
  Chip,
  useTheme
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const QueryHistory = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const queryHistory = useSelector(selectQueryHistory);

  const handleHistoryItemClick = (query) => {
    dispatch(setCurrentQuery(query));
  };

  if (queryHistory.length === 0) {
    return (
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mt: 2, 
          bgcolor: 'white', 
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 5,
          border: `1px dashed ${theme.palette.grey[300]}`,
          backgroundImage: `radial-gradient(${theme.palette.grey[100]} 1px, transparent 0)`,
          backgroundSize: '20px 20px',
        }}
      >
        <Avatar 
          sx={{ 
            bgcolor: theme.palette.grey[100], 
            width: 60, 
            height: 60, 
            mb: 2,
            boxShadow: `0 0 0 4px ${theme.palette.background.default}`
          }}
        >
          <HistoryIcon sx={{ color: theme.palette.grey[400], fontSize: 28 }} />
        </Avatar>
        <Typography variant="h6" sx={{ color: theme.palette.grey[700], fontWeight: 500, mb: 0.5 }}>
          No History Yet
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.grey[500], textAlign: 'center' }}>
          Your query history will appear here after you ask questions
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        mt: 2, 
        borderRadius: '12px', 
        overflow: 'hidden',
        border: `1px solid ${theme.palette.grey[200]}`,
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          bgcolor: theme.palette.grey[50], 
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
          <HistoryIcon sx={{ mr: 1, color: theme.palette.grey[700] }} />
          Recent Queries
        </Typography>
        <Chip 
          size="small" 
          label={`${queryHistory.length} ${queryHistory.length === 1 ? 'query' : 'queries'}`} 
          sx={{ bgcolor: theme.palette.primary.main + '10', color: theme.palette.primary.main }}
        />
      </Box>
      <List sx={{ py: 0 }}>
        {queryHistory.map((query, index) => (
          <React.Fragment key={index}>
            <ListItem
              button
              onClick={() => handleHistoryItemClick(query)}
              sx={{ 
                py: 2,
                px: 2,
                transition: 'all 0.2s ease',
                '&:hover': { 
                  bgcolor: theme.palette.primary.main + '08',
                  '& .runIcon': {
                    opacity: 1,
                    transform: 'translateX(0)',
                  }
                }, 
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <AccessTimeIcon sx={{ color: index === 0 ? theme.palette.primary.main : theme.palette.grey[400] }} />
              </ListItemIcon>
              <ListItemText 
                primary={query}
                primaryTypographyProps={{
                  style: {
                    fontWeight: index === 0 ? 500 : 400,
                    fontSize: '0.9rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }
                }}
                secondary={`Executed ${index === 0 ? 'just now' : 'earlier'}`} 
                secondaryTypographyProps={{
                  style: {
                    fontSize: '0.75rem',
                    color: index === 0 ? theme.palette.primary.main : theme.palette.text.secondary
                  }
                }}
              />
              <PlayCircleOutlineIcon 
                className="runIcon" 
                sx={{ 
                  color: theme.palette.primary.main,
                  opacity: 0,
                  transform: 'translateX(-10px)',
                  transition: 'all 0.2s ease',
                  fontSize: 20
                }} 
              />
            </ListItem>
            {index < queryHistory.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default QueryHistory; 