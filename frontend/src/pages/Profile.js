import React, { useEffect, useState } from 'react';
import { Card, CardContent, Avatar, Typography, TextField, Button, Stack, Switch, Box, Divider, Snackbar } from '@mui/material';
import axios from 'axios';

const Profile = ({ tasks, completedCount, onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', preferences: { theme: 'light', notifications: true } });
  const [snackbar, setSnackbar] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/me`, { headers: { Authorization: `Bearer ${token}` } });
      setProfile(res.data);
      setForm({
        username: res.data.username || '',
        email: res.data.email || '',
        preferences: res.data.preferences || { theme: 'light', notifications: true }
      });
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    await axios.put(`${process.env.REACT_APP_API_URL}/users/me`, form, { headers: { Authorization: `Bearer ${token}` } });
    setSnackbar('Profile updated!');
    setEditMode(false);
  };

  if (!profile) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Card sx={{ minWidth: 350, maxWidth: 400, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Stack alignItems="center" spacing={2}>
            <Avatar sx={{ width: 64, height: 64 }} src={profile.avatar_url}>
              {profile.username ? profile.username[0].toUpperCase() : '?'}
            </Avatar>
            {editMode ? (
              <>
                <TextField label="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} fullWidth />
              </>
            ) : (
              <>
                <Typography variant="h6">{profile.username}</Typography>
              </>
            )}
            <Divider sx={{ width: '100%', my: 2 }} />
            <Typography variant="body2">Completed Tasks: {completedCount}</Typography>
            <Typography variant="body2">Pending Tasks: {tasks.length - completedCount}</Typography>
            <Divider sx={{ width: '100%', my: 2 }} />
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography>Notifications</Typography>
              <Switch checked={form.preferences.notifications} onChange={e => setForm({ ...form, preferences: { ...form.preferences, notifications: e.target.checked } })} />
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              {editMode ? (
                <Button variant="contained" onClick={handleSave}>Save</Button>
              ) : (
                <Button variant="outlined" onClick={() => setEditMode(true)}>Edit</Button>
              )}
              <Button variant="contained" color="error" onClick={onLogout}>Logout</Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Snackbar open={!!snackbar} autoHideDuration={3000} onClose={() => setSnackbar('')} message={snackbar} />
    </Box>
  );
};

export default Profile;
