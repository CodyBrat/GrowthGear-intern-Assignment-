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
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const QueryInput = () => {
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

  // Example queries for quick selection
  const exampleQueries = [
    'Show sales performance by region',
    'Compare revenue across product categories',
    'Top 5 customers by revenue'
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
        {exampleQueries.map((query, index) => (
          <Chip
            key={index}
            label={query}
            onClick={() => dispatch(setCurrentQuery(query))}
            color="primary"
            variant="outlined"
            sx={{ cursor: 'pointer', mb: 1 }}
          />
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
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<SearchIcon />}
            disabled={!currentQuery.trim()}
            sx={{ ml: 2 }}
          >
            Query
          </Button>
        </Box>
        
        {showSuggestions && (
          <Paper sx={{ position: 'absolute', zIndex: 10, width: '100%', mt: 1, maxHeight: '300px', overflow: 'auto' }}>
            <List>
              {filteredSuggestions.map((suggestion, index) => (
                <ListItem 
                  key={index} 
                  button 
                  onClick={() => handleSuggestionClick(suggestion)}
                  sx={{ '&:hover': { bgcolor: '#f5f5f5' } }}
                >
                  <ListItemText primary={suggestion} />
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