import { useState } from 'react';
import { Box, Typography, TextField, IconButton, Paper, List, ListItem, ListItemText, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MainAppBar from '../components/MainAppBar';
import { api } from '../services/api';
import { log, handleError } from '../shared/utils';
import { ScriptKittyMessage } from '../shared/proto/script_kitty_messages';
import { AgentStatus } from '../shared/proto/agent_status';

// Use proto type for agent status
const mockAgents: AgentStatus[] = [
  { agentId: 'alpha', status: 'online', message: 'General purpose agent', timestamp: new Date().toISOString() },
  { agentId: 'beta', status: 'busy', message: 'Data processing agent', timestamp: new Date().toISOString() },
  { agentId: 'gamma', status: 'offline', message: 'Maintenance agent', timestamp: new Date().toISOString() },
];

const Agent: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentStatus>(mockAgents[0]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ScriptKittyMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ScriptKittyMessage = {
      id: crypto.randomUUID(),
      type: 'user',
      payload: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      log('Sending agent command', input);
      const res = await api.sendAgentCommand(input);
      const agentMsg: ScriptKittyMessage = {
        id: crypto.randomUUID(),
        type: 'agent',
        payload: res.result,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, agentMsg]);
      log('Agent response received', res);
    } catch (err) {
      handleError(err, 'AgentChat');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <MainAppBar />
      <Box sx={{ p: 3, maxWidth: 700, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>Agent Chat</Typography>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Agents</Typography>
          {mockAgents.map(agent => (
            <IconButton
              key={agent.agentId}
              color={selectedAgent.agentId === agent.agentId ? 'primary' : 'default'}
              onClick={() => setSelectedAgent(agent)}
              sx={{ mr: 1 }}
            >
              <Avatar>{agent.agentId[0].toUpperCase()}</Avatar>
            </IconButton>
          ))}
        </Paper>
        <Paper sx={{ p: 2, minHeight: 350, mb: 2, bgcolor: 'grey.50' }}>
          <List>
            {messages.map((msg, i) => (
              <ListItem key={i} sx={{ justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: msg.type === 'user' ? 'row-reverse' : 'row', alignItems: 'center', width: '100%' }}>
                  <Avatar sx={{ bgcolor: msg.type === 'user' ? 'primary.main' : 'secondary.main', ml: msg.type === 'user' ? 2 : 0, mr: msg.type === 'agent' ? 2 : 0 }}>
                    {msg.type === 'user' ? 'U' : selectedAgent.agentId[0].toUpperCase()}
                  </Avatar>
                  <Paper sx={{ p: 1.5, bgcolor: msg.type === 'user' ? 'primary.light' : 'grey.200', maxWidth: '70%', ml: 1, mr: 1 }}>
                    <ListItemText primary={msg.payload} secondary={new Date(msg.timestamp).toLocaleTimeString()} />
                  </Paper>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            label="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            fullWidth
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            disabled={loading}
          />
          <IconButton color="primary" onClick={handleSend} disabled={!input.trim() || loading}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Agent;
