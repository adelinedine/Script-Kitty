import { ListItem, ListItemText, Chip } from '@mui/material';

interface LogEntryProps {
  message: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error';
}

const severityColor = {
  info: 'primary',
  warning: 'warning',
  error: 'error',
} as const;

export default function LogEntry({ message, timestamp, severity }: LogEntryProps) {
  return (
    <ListItem divider>
      <ListItemText
        primary={message}
        secondary={new Date(timestamp).toLocaleString()}
      />
      <Chip label={severity} color={severityColor[severity]} size="small" />
    </ListItem>
  );
}
