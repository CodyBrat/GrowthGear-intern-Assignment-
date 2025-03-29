# GenAI Analytics Dashboard

A React-based dashboard prototype for a GenAI Analytics tool that demonstrates natural language query interaction and data visualization.

## Project Overview

This dashboard showcases how non-technical users can interact with data using natural language queries. The application allows users to:

- Ask complex business questions in plain English
- Get instant, visual insights from data
- View query history for quick re-runs
- Explore different data visualizations based on query intent

## Features

- **Natural Language Query Input:** Ask business questions in plain text with AI-powered query suggestions
- **Query Processing Simulation:** Backend request simulation with appropriate loading states
- **Data Visualization:** Dynamic charts based on query type (bar, line, pie charts)
- **Query History:** Track and reuse previous queries
- **Responsive Design:** Works seamlessly across devices

## Technical Stack

- **Frontend Framework:** React.js
- **State Management:** Redux with Redux Toolkit
- **UI Components:** Material-UI 
- **Styling:** Tailwind CSS
- **Data Visualization:** Recharts
- **Build Tool:** Create React App

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Type a business question in the query input field
2. Alternatively, select from the suggested queries
3. View the visualization of the query results
4. Check your query history on the left panel
5. Click on any previous query to run it again

## Example Queries

- "Show sales performance by region"
- "Compare revenue across product categories"
- "What are the top 5 customers by revenue?"
- "Show monthly website traffic trends"
- "Analyze customer churn rate by segment"

## Architecture

The application follows a standard Redux architecture:
- Components for UI presentation
- Slices for state management
- API simulation for data fetching
- Selectors for accessing state