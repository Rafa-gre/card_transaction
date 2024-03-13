import axios from 'axios';

async function createRandomTransaction() {
  const amount = (Math.random() * 50000).toFixed(2); // Valor aleatório entre 0 e 50000
  const type = Math.random() > 0.5 ? 'CREDIT' : 'DEBIT'; // Tipo aleatório

  try {
    await axios.post('http://localhost:3000/transactions', { amount, type });
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
}

main();
