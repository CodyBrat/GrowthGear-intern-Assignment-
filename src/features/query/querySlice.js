import { createSlice } from '@reduxjs/toolkit';

// Mock suggestions for AI-powered query input
const mockSuggestions = [
  'Show sales performance by region for Q1 2023',
  'Compare revenue across product categories',
  'What are the top 5 customers by revenue?',
  'Show monthly website traffic trends',
  'Analyze customer churn rate by segment'
];

// Initial state for the query slice
const initialState = {
  currentQuery: '',
  queryHistory: [],
  suggestions: mockSuggestions,
  isProcessing: false,
  results: null,
  error: null
};

// Create the query slice
export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setCurrentQuery: (state, action) => {
      state.currentQuery = action.payload;
    },
    submitQuery: (state, action) => {
      state.isProcessing = true;
      state.error = null;
      // Add to history if it's not already the most recent query
      if (state.queryHistory.length === 0 || 
          state.queryHistory[0] !== action.payload) {
        state.queryHistory = [action.payload, ...state.queryHistory.slice(0, 9)];
      }
    },
    queryProcessingComplete: (state, action) => {
      state.isProcessing = false;
      state.results = action.payload;
    },
    queryFailed: (state, action) => {
      state.isProcessing = false;
      state.error = action.payload;
    },
    clearCurrentQuery: (state) => {
      state.currentQuery = '';
    },
    clearResults: (state) => {
      state.results = null;
    }
  }
});

// Export actions
export const {
  setCurrentQuery,
  submitQuery,
  queryProcessingComplete,
  queryFailed,
  clearCurrentQuery,
  clearResults
} = querySlice.actions;

// Selectors
export const selectCurrentQuery = (state) => state.query.currentQuery;
export const selectQueryHistory = (state) => state.query.queryHistory;
export const selectSuggestions = (state) => state.query.suggestions;
export const selectIsProcessing = (state) => state.query.isProcessing;
export const selectResults = (state) => state.query.results;
export const selectError = (state) => state.query.error;

export default querySlice.reducer; 