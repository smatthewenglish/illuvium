/**
 *
 */
 require("@nomiclabs/hardhat-etherscan");
 require("@nomiclabs/hardhat-truffle5");
 require("@nomiclabs/hardhat-waffle");
 require('dotenv').config();
 require("@nomiclabs/hardhat-ethers");
 require("hardhat-gas-reporter");
 require('hardhat-contract-sizer');
 require('solidity-coverage');
 
 module.exports = {
 
    solidity: {
         version: "0.8.9",
         settings: {
             optimizer: {
                 enabled: true,
                 runs: 200
             },
         },
    },
    
    //defaultNetwork: "mainnet_polygon",
    defaultNetwork: "hardhat",
    //defaultNetwork: "hardhat",
    networks: {
       hardhat: {},
       rinkeby: {
          //gas: 1400000,
          gasPrice: 100e9,
          url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
          accounts: { mnemonic: process.env.MNEMONIC }
       },
       mainnet: {
          //gas: 1400000,
          gasPrice: 89e9,
          url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
          accounts: { mnemonic: process.env.MNEMONIC }
       },
       mainnet_polygon: {
          url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
          accounts: { mnemonic: process.env.MNEMONIC }
       },
       mumbai_polygon: {
          url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
          accounts: { mnemonic: process.env.MNEMONIC }
       }
    },
    mocha: {
      timeout: 100000000
    },
    etherscan: {
     apiKey: process.env.ETHERSCAN_API_KEY
   },
   gasReporter: {
    enabled: true
   }
 }