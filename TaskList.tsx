import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/tasks', {
          headers: { 'auth-token': localStorage.getItem('token') } // Include the auth token in the request headers
        });
        setTasks(data); // Set fetched tasks to state
      } catch (error) {
        console.error(error); // Handle errors
      }
    };

    fetchTasks(); // Fetch tasks on component mount
  }, []);

  return (
    <div>
      {tasks.map((task: any) => (
        <div key={task.id}>{task.title}</div> // Display each task title
      ))}
    </div>
  );
};

export default TaskList; // Export TaskList component for use in App.tsx
