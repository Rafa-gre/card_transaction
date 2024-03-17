import axios from 'axios';
import * as dotenv from 'dotenv';
async function createRandomTransaction() {
  dotenv.config();

  const amount = (Math.random() * 50000).toFixed(2); // Valor aleatório entre 0 e 50000
  const type = Math.random() > 0.5 ? 'CREDIT' : 'DEBIT'; // Tipo aleatório
  const apiUrl = process.env.API_URL || 'http://localhost:3000';
  console.log(apiUrl);

  try {
    await axios.post(`${apiUrl}/transactions`, { amount, type });
    console.log('Transação criada com sucesso:', { amount, type });
  } catch (error) {
    console.error('Erro ao criar transação:', error.response?.data);
  }
}

async function main() {
  const promises = [];
  for (let i = 0; i < 100; i++) {
    promises.push(createRandomTransaction());
  }
  await Promise.all(promises);
  console.log('Transações criadas com sucesso');
}

main();
