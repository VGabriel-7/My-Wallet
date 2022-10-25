import data from './mockData';

const state = {
  user: {
    email: 'alguem@gmail.com',
  },
  wallet: {
    editor: true,
    expenses: [{
      id:0,
      value:1,
      description:"",
      currency:"USD",
      method:"Dinheiro",
      tag:"Alimentação",
      exchangeRates: {...data}
    }],
    currencies: [
      "USD",
      "CAD",
      "ARS",
      "BTC",
      "LTC",
      "EUR",
      "JPY",
      "CHF",
      "AUD",
      "CNY",
      "ILS",
      "ETH",
      "XRP",
      "DOGE",
      "GBP",
    ]
  },
}

export default state;
