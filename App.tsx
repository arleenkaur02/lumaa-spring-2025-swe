import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/tasks" component={TaskList} />
        <Redirect from="/" to="/login" /> // Default redirect to login page
      </Switch>
    </Router>
  );
}

export default App; // Export App component for use in index.tsx
