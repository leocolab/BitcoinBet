const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKey = "7d42c1a2237c6e7ad00bc3d6a568f3bdb78b904e5de08843cd983bada8ba1c02";
const endpointUrl = "wss://kovan.infura.io/ws/v3/0d7726fd919c45a199b9bfecae5eac1c";
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          //private keys array
          [privateKey],
          //url to ethereum node
          endpointUrl
        )
      },
      gas: 5000000,
      gasPrice: 1000000000,
      network_id: 42
    }
  }
}

