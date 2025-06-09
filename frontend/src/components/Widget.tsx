import { Card, CardContent, Typography } from '@mui/material';

interface WidgetProps {
  title: string;
  value: React.ReactNode;
}

export default function Widget({ title, value }: WidgetProps) {
  return (
    <Card sx={{ minWidth: 180, m: 1 }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5">{value}</Typography>
      </CardContent>
    </Card>
  );
}
