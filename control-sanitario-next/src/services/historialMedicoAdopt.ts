

import api from './api';

export async function getHealthStates() {
  try {
    const res = await api.get('/health-states');
    return res.data;
  } catch (error) {
    console.error('Error en getHealthStates:', error);
    return [];
  }
}
