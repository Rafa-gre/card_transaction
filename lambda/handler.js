'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.createCardTransaction = async (event) => {
  try {
    console.log('Received SQS event:', event);

    const records = event.Records;

    const promises = records.map(async (record) => {
      const messageBody = JSON.parse(record.body);

      console.log("MESSAGE", messageBody);
      // Criar um registro no DynamoDB com base no corpo da mensagem
      const params = {
        TableName: 'card_transactions',
        Item: {
          ...messageBody
        }
      };

      console.log("PARAMS", params);

      await dynamodb.put(params).promise();
    });

    // Esperar que todas as promessas sejam resolvidas
    await Promise.all(promises);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Mensagens processadas com sucesso',
        input: event
      })
    };
  } catch (error) {
    console.error('Erro ao processar o evento do SQS:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Erro ao processar o evento do SQS',
        error: error
      })
    };
  }
};
