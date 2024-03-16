import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const fetchTransactions = async (filter: Record<string, string | undefined> | undefined) => { 
  try {
    console.log("FILTER",filter)
    const response = await axios.get(`${BASE_URL}/transactions`, { params:  filter  });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};




