import React, { useEffect, useState } from 'react';
import { Box, Typography, Fab, Snackbar, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../components/Sidebar';
import TaskList from '../components/TaskList';
import AddEditTaskModal from '../components/AddEditTaskModal';
import Profile from './Profile';
import api from '../services/api';

const ENABLE_NOTIFICATIONS = true;
const ENABLE_DARK_MODE = true;
const ENABLE_DRAG_DROP = true;
const ENABLE_PROGRESS_BAR = true;

const Dashboard = ({ toggleDarkMode }) => {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [notification, setNotification] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed', 'profile'

  const fetchTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = () => {
    setEditTask(null);
    setOpenModal(true);
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setOpenModal(true);
  };

  const handleSaveTask = async (task) => {
    try {
      if (editTask) {
        await api.put(`/tasks/${editTask._id}`, task);
        setNotification('Task updated!');
      } else {
        await api.post('/tasks', task);
        setNotification('Task added!');
      }
      setOpenModal(false);
      fetchTasks();
    } catch (error) {
      setNotification('Error saving task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setNotification('Task deleted!');
      fetchTasks();
    } catch (error) {
      setNotification('Error deleting task');
    }
  };

  const handleCompleteTask = async (id, status) => {
    try {
      await api.put(`/tasks/${id}`, { status });
      setNotification(status === 'completed' ? 'Task completed!' : 'Task marked as pending!');
      fetchTasks();
    } catch (error) {
      setNotification('Error updating task status');
    }
  };

  const completedCount = tasks.filter(t => t.status === 'completed').length;

  // Filter tasks based on sidebar selection
  let filteredTasks = tasks;
  if (filter === 'pending') filteredTasks = tasks.filter(t => t.status === 'pending');
  if (filter === 'completed') filteredTasks = tasks.filter(t => t.status === 'completed');

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar toggleDarkMode={toggleDarkMode} setFilter={setFilter} filter={filter} />
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {filter === 'profile' ? 'Profile' : 'Task List'}
        </Typography>
        {filter !== 'profile' && (
          <>
            <LinearProgress variant="determinate" value={tasks.length ? (completedCount / tasks.length) * 100 : 0} sx={{ mb: 2 }} />
            <TaskList tasks={filteredTasks} onEdit={handleEditTask} onDelete={handleDeleteTask} onComplete={handleCompleteTask} />
            <Fab color="primary" sx={{ position: 'fixed', bottom: 32, right: 32 }} onClick={handleAddTask}>
              <AddIcon />
            </Fab>
            <AddEditTaskModal open={openModal} onClose={() => setOpenModal(false)} onSave={handleSaveTask} editTask={editTask} />
          </>
        )}
        {filter === 'profile' && (
          <Profile
            tasks={tasks}
            completedCount={completedCount}
            onLogout={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('username');
              window.location.href = '/';
            }}
          />
        )}
        <Snackbar open={!!notification} autoHideDuration={3000} onClose={() => setNotification('')} message={notification} />
      </Box>
    </Box>
  );
};

export default Dashboard;
