import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import MainAppBar from '../components/MainAppBar';
import Widget from '../components/Widget';
import AgentCard from '../components/AgentCard';
import { api } from '../services/api';
import { log } from '../shared/utils';
import { AgentStatus } from '../shared/proto/agent_status';

interface DashboardData {
  agentsOnline: number;
  status: string;
}

const Dashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [agents, setAgents] = useState<AgentStatus[]>([]);

  useEffect(() => {
    api.getDashboardData().then(data => {
      setDashboard(data);
      log('Dashboard data loaded', data);
    });
    // Simulate agent list
    const agentList: AgentStatus[] = [
      { agentId: 'alpha', status: 'online', message: 'General purpose agent', timestamp: new Date().toISOString() },
      { agentId: 'beta', status: 'busy', message: 'Data processing agent', timestamp: new Date().toISOString() },
      { agentId: 'gamma', status: 'offline', message: 'Maintenance agent', timestamp: new Date().toISOString() },
    ];
    setAgents(agentList);
    log('Agent list set', agentList);
  }, []);

  return (
    <Box>
      <MainAppBar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
          <Widget title="Agents Online" value={dashboard?.agentsOnline ?? '-'} />
          <Widget title="System Status" value={dashboard?.status ?? '-'} />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>Agents</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {agents.map(agent => (
              <AgentCard
                key={agent.agentId}
                name={agent.agentId}
                status={agent.status as 'online' | 'busy' | 'offline'}
                description={agent.message}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
