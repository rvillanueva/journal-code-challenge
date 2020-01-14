import plaid from 'plaid';
import config from '../config/environment';

const plaidClient = new plaid.Client(
  config.plaid.clientId,
  config.plaid.secret,
  config.plaid.publicKey,
  plaid.environments[config.plaid.env]
);

export default plaidClient;
