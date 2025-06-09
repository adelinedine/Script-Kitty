import { useEffect, useState } from 'react';
import { Box, Typography, List, Paper, TextField, MenuItem } from '@mui/material';
import MainAppBar from '../components/MainAppBar';
import LogEntry from '../components/LogEntry';
import { api } from '../services/api';
import { log } from '../shared/utils';

const severities = ['info', 'warning', 'error'];

interface LogEntryType {
  message: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error';
}

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntryType[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    api.getLogs().then(data => {
      setLogs(data);
      log('Logs loaded', data);
    });
  }, []);

  const filteredLogs = filter ? logs.filter((l: LogEntryType) => l.severity === filter) : logs;

  return (
    <Box>
      <MainAppBar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Logs
        </Typography>
        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <TextField
            select
            label="Severity Filter"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">All</MenuItem>
            {severities.map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
        </Box>
        <Paper>
          <List>
            {filteredLogs.map((log, i) => (
              <LogEntry key={i} message={log.message} timestamp={log.timestamp} severity={log.severity || 'info'} />
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default Logs;
