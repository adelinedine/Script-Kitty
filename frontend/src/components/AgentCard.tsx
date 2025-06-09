import { Card, CardContent, Typography, Chip, Box } from '@mui/material';

interface AgentCardProps {
  name: string;
  status: 'online' | 'offline' | 'busy';
  description?: string;
}

const statusColor = {
  online: 'success',
  offline: 'default',
  busy: 'warning',
} as const;

export default function AgentCard({ name, status, description }: AgentCardProps) {
  return (
    <Card sx={{ minWidth: 250, m: 1 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{name}</Typography>
          <Chip label={status} color={statusColor[status]} size="small" />
        </Box>
        {description && (
          <Typography variant="body2" color="text.secondary" mt={1}>
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
