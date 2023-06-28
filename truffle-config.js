const HDWalletProvider = require("@truffle/hdwallet-provider");
const infuraKey = process.env.INFURA_API_KEY;
const mnemonic = process.env.MNEMONIC;

module.exports = {
  networks: {
    goerli: {
      provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/${infuraKey}`),
      network_id: 5,
      gas: 5500000,
    },
  },

  compilers: {
    solc: {
      version: "0.8.6",
    },
  },
};
