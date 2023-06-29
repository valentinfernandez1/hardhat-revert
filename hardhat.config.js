/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

const { PKEY1, PKEY2, PKEY3, PKEY4, PKEY5 } = require("./accounts.json");

const pkeys = [
  PKEY1,
  PKEY2,
  PKEY3,
  PKEY4,
  PKEY5,
];

module.exports = {
  solidity: {
    version: '0.8.20',
    settings: {
      evmVersion: 'london',
    },
  },
  networks: {
    hardhat:{},
    dev: {
      url: 'http://127.0.0.1:9944',
      accounts: pkeys
    },
  },
};
