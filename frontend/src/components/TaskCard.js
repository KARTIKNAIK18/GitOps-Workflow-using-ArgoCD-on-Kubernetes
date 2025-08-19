import React from 'react';
import { Card, CardContent, Typography, IconButton, Checkbox, Stack, Chip, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskCard = ({ task, onEdit, onDelete, onComplete }) => (
  <Card sx={{ mb: 2, boxShadow: 2, borderRadius: 2 }}>
    <CardContent>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Checkbox checked={task.status === 'completed'} onChange={() => onComplete(task._id, task.status === 'completed' ? 'pending' : 'completed')} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">{task.title}</Typography>
          <Typography variant="body2" color="text.secondary">{task.description}</Typography>
          <Typography variant="caption" color="text.secondary">Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'} | <Chip label={task.priority} size="small" /></Typography>
        </Box>
        <IconButton onClick={() => onEdit(task)}><EditIcon /></IconButton>
        <IconButton onClick={() => onDelete(task._id)}><DeleteIcon /></IconButton>
      </Stack>
    </CardContent>
  </Card>
);

export default TaskCard;
