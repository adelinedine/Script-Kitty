// API service for backend integration
// Using real API calls with fetch

import { log, recordMetric, getApiBaseUrl, handleError } from '../shared/utils';

export const api = {
  getDashboardData: async () => {
    try {
      const res = await fetch(`${getApiBaseUrl()}/dashboard`);
      if (!res.ok) throw new Error('Failed to fetch dashboard data');
      log('Fetched dashboard data');
      return res.json();
    } catch (err) {
      handleError(err, 'getDashboardData');
      throw err;
    }
  },
  sendAgentCommand: async (command: string) => {
    try {
      const res = await fetch(`${getApiBaseUrl()}/agent/command`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });
      if (!res.ok) throw new Error('Failed to send agent command');
      log('Sent agent command', command);
      recordMetric('agent_command_sent', 1);
      return res.json();
    } catch (err) {
      handleError(err, 'sendAgentCommand');
      throw err;
    }
  },
  getLogs: async () => {
    try {
      const res = await fetch(`${getApiBaseUrl()}/logs`);
      if (!res.ok) throw new Error('Failed to fetch logs');
      log('Fetched logs');
      return res.json();
    } catch (err) {
      handleError(err, 'getLogs');
      throw err;
    }
  },
  getSettings: async () => {
    try {
      const res = await fetch(`${getApiBaseUrl()}/settings`);
      if (!res.ok) throw new Error('Failed to fetch settings');
      log('Fetched settings');
      return res.json();
    } catch (err) {
      handleError(err, 'getSettings');
      throw err;
    }
  },
  updateSettings: async (settings: Record<string, unknown>) => {
    try {
      const res = await fetch(`${getApiBaseUrl()}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Failed to update settings');
      log('Updated settings', settings);
      recordMetric('settings_updated', 1);
      return res.json();
    } catch (err) {
      handleError(err, 'updateSettings');
      throw err;
    }
  },
};

// Example usage:
// log('Info message');
// recordMetric('api_call', 1, { endpoint: '/dashboard', method: 'GET' });
