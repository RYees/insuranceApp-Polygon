// import { HardhatUserConfig, task } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";

// const config: HardhatUserConfig = {
//   solidity: "0.8.18",
//   paths: { tests: "tests" },
// };

// export default config;



require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: '0.8.1',
  networks: {
    aurora_testnet: {
      url: 'https://testnet.aurora.dev',
      accounts: [process.env.PRIVATE_KEY],
      chainId: 1313161555
     // gasPrice: 120 * 1000000000
    }
  },
};
