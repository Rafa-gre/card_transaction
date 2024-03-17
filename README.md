# Projeto de Transações de Cartão

Este é um projeto simples que consiste em uma API Node.js que recebe transações de cartão e as coloca em uma fila na AWS SQS. Uma função Lambda conectada à fila pega cada mensagem e as salva em um banco de dados DynamoDB. Além disso, há uma aplicação web simples usando Next.js que exibe as transações salvas no DynamoDB.

## Tecnologias Utilizadas

- Node.js
- AWS SQS
- AWS Lambda
- AWS DynamoDB
- Next.js

## Configuração

1. **Clonando o Repositório:**
   
   ```bash
   git clone https://github.com/Rafa-gre/card_transaction
   cd card_transaction
   ```
2. **Instalando Dependências:**
   
   ```bash
   npm install
   ```
3. **Configurando Variáveis de Ambiente**
   - Crie um arquivo .env na raiz do projeto e defina as seguintes variáveis de ambiente
   ```
    AWS_ACCESS_KEY_ID=SUA_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY=SUA_SECRET_ACCESS_KEY
    AWS_REGION=SUA_REGIAO
   ```
4. **Implantando o Backend:**

 - Execute a API Node.js em um ambiente adequado, como AWS EC2, Heroku ou outro serviço de hospedagem
 - Certifique-se de que a API esteja acessível publicamente e atualize a URL no frontend.
  
 5. **Testando a Aplicação:**

 - Execute o script de teste fornecido para criar 100 transações e fazer a requisição POST.
 - O script que cria as transações esta localizado em: 
 ```bash
 ./api/populateDb.ts
 ```
 6. **Acessando o Frontend:**

 - Acesse o frontend em https://card-transaction.vercel.app/.

7. **Documentação da API**
   
 - A documentação da API pode ser encontrada em https://card-transaction-api.onrender.com/api-docs.
  
## Observações
 - Como o backend está hospedado em um servidor gratuito, pode levar cerca de 50 segundos para iniciar.
 - Os serviços de banco de dados, fila e lambda estão configurados para a minha conta e não estão expostos nesse repositório. 
 - Para testar e verificar o funcionamento correto do sistema utilizar os links hospedados acima.