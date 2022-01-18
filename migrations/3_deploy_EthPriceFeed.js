const EthPriceFeed = artifacts.require("EthPriceFeed");

module.exports = function (deployer) {
  deployer.deploy(EthPriceFeed);
};
