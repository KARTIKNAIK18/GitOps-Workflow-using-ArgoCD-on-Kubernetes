import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Stack } from '@mui/material';

const priorities = ['Low', 'Medium', 'High'];

const AddEditTaskModal = ({ open, onClose, onSave, editTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setDueDate(editTask.due_date ? editTask.due_date.substring(0, 10) : '');
      setPriority(editTask.priority);
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Medium');
    }
  }, [editTask]);

  const handleSave = () => {
    onSave({ title, description, due_date: dueDate, priority });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editTask ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} fullWidth />
          <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} fullWidth multiline rows={2} />
          <TextField label="Due Date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
          <TextField label="Priority" select value={priority} onChange={e => setPriority(e.target.value)} fullWidth>
            {priorities.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditTaskModal;
