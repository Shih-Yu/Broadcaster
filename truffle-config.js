// Importing dotenv to keep tokens private
require("dotenv").config();

// Using Truffle's wallet provider to connect to blockchain
const HDWalletProvider = require('@truffle/hdwallet-provider');
// Delcaring path to set build directory inside scr directory
const path = require("path");
// Destructuring .env variables
const { MNEMONIC, ALCHEMY_API } = process.env;

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  // Assigning th ebuild directory to be created inside the scr directory
  contracts_build_directory: path.join(__dirname, "client/src/build"),

  networks: {
    development: {
     host: "127.0.0.1",     
     port: 8545,            
     network_id: "*",       
    },
 

    // NB: It's important to wrap the provider as a function.
    // Configs to connect to Rinkeby Testnet
    rinkeby: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API}`
      ),
    network_id: 4,       
    // gas: 5500000,        // Ropsten has a lower block limit than mainnet
    // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "pragma",   
      //  evmVersion: "byzantium"
      // }
    }
  },
};