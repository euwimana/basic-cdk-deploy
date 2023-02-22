const { quotes } = require('./quotes');

exports.handler = async (event, context) => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,GET',
    },
    isBase64Encoded: false,
    body: JSON.stringify(quote),
  }
}