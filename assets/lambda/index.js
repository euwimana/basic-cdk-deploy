const { quotes } = require('./quotes');

exports.handler = async (event, context) => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return { statusCode: 200, body: quote }
}