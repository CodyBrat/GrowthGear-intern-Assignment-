import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setCurrentQuery, 
  submitQuery, 
  queryProcessingComplete, 
  queryFailed,
  selectCurrentQuery,
  selectSuggestions
} from '../features/query/querySlice';
import { processQuery } from '../features/query/queryAPI';
import { 
  TextField, 
  Button, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  Chip,
  Stack,
  InputAdornment,
  useTheme,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ScienceIcon from '@mui/icons-material/Science';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';

const QueryInput = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentQuery = useSelector(selectCurrentQuery);
  const suggestions = useSelector(selectSuggestions);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const inputRef = useRef(null);

  // Filter suggestions based on current input
  useEffect(() => {
    if (currentQuery && currentQuery.length > 1) {
      const filtered = suggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(currentQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [currentQuery, suggestions]);

  // Handle query input change
  const handleQueryChange = (e) => {
    dispatch(setCurrentQuery(e.target.value));
  };

  // Handle query submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentQuery.trim()) return;
    
    dispatch(submitQuery(currentQuery));
    
    try {
      const results = await processQuery(currentQuery);
      dispatch(queryProcessingComplete(results));
    } catch (error) {
      dispatch(queryFailed(error.message));
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    dispatch(setCurrentQuery(suggestion));
    setShowSuggestions(false);
    // Focus back on the input after selection
    inputRef.current?.focus();
  };

  // Example queries with icons
  const exampleQueries = [
    { text: 'Show sales performance by region', icon: <TrendingUpIcon fontSize="small" /> },
    { text: 'Compare revenue across product categories', icon: <ScienceIcon fontSize="small" /> },
    { text: 'Top 5 customers by revenue', icon: <PeopleIcon fontSize="small" /> }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        {exampleQueries.map((query, index) => (
          <Tooltip key={index} title="Click to use this example query" arrow placement="top">
            <Chip
              icon={query.icon}
              label={query.text}
              onClick={() => dispatch(setCurrentQuery(query.text))}
              color="primary"
              variant="outlined"
              sx={{ 
                cursor: 'pointer', 
                mb: 1, 
                py: 1,
                borderRadius: '20px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: `${theme.palette.primary.main}10`,
                  borderColor: theme.palette.primary.main,
                }
              }}
            />
          </Tooltip>
        ))}
      </Stack>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ position: 'relative', width: '100%' }}>
        <Box sx={{ display: 'flex' }}>
          <TextField
            inputRef={inputRef}
            fullWidth
            variant="outlined"
            placeholder="Ask a business question..."
            value={currentQuery}
            onChange={handleQueryChange}
            onFocus={() => currentQuery && setShowSuggestions(filteredSuggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            sx={{
              '.MuiOutlinedInput-root': {
                borderRadius: '12px',
                bgcolor: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: '0 3px 6px rgba(0,0,0,0.1)'
                },
                '&.Mui-focused': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!currentQuery.trim()}
            sx={{ 
              ml: 2, 
              px: 3,
              borderRadius: '12px',
              boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)',
                transform: 'translateY(-1px)'
              }
            }}
          >
            Query
          </Button>
        </Box>
        
        {showSuggestions && (
          <Paper 
            elevation={3} 
            sx={{ 
              position: 'absolute', 
              zIndex: 10, 
              width: '100%', 
              mt: 1, 
              maxHeight: '300px', 
              overflow: 'auto',
              borderRadius: '12px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}
          >
            <List sx={{ py: 0 }}>
              {filteredSuggestions.map((suggestion, index) => (
                <ListItem 
                  key={index} 
                  button 
                  onClick={() => handleSuggestionClick(suggestion)}
                  sx={{ 
                    py: 1.5,
                    borderBottom: index < filteredSuggestions.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                    '&:hover': { 
                      bgcolor: `${theme.palette.primary.main}08`,
                    }
                  }}
                >
                  <SearchIcon color="action" sx={{ mr: 1, fontSize: 20, opacity: 0.7 }} />
                  <ListItemText 
                    primary={suggestion}
                    primaryTypographyProps={{
                      style: {
                        fontWeight: 500
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default QueryInput; 