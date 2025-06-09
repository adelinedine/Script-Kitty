import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Switch, FormControlLabel } from '@mui/material';
import MainAppBar from '../components/MainAppBar';
import { api } from '../services/api';
import { log, handleError } from '../shared/utils';

interface SettingsType {
  theme: 'light' | 'dark';
  notifications: boolean;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsType>({ theme: 'light', notifications: true });

  useEffect(() => {
    api.getSettings()
      .then(data => {
        setSettings(data);
        log('Settings loaded', data);
      })
      .catch(err => handleError(err, 'SettingsLoad'));
  }, []);

  const handleToggle = (key: keyof SettingsType) => {
    setSettings((prev: SettingsType) => {
      const updated = { ...prev, [key]: !prev[key] };
      api.updateSettings(updated)
        .then(() => {
          log('Settings updated', updated);
        })
        .catch(err => handleError(err, 'SettingsUpdate'));
      return updated;
    });
  };

  return (
    <Box>
      <MainAppBar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <Typography>Configure your Script Kitty AGI frontend here.</Typography>
        <Paper sx={{ p: 3, maxWidth: 400 }}>
          <FormControlLabel
            control={<Switch checked={settings.notifications} onChange={() => handleToggle('notifications')} />}
            label="Enable Notifications"
          />
          <FormControlLabel
            control={<Switch checked={settings.theme === 'dark'} onChange={() => handleToggle('theme')} />}
            label="Dark Theme"
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default Settings;
