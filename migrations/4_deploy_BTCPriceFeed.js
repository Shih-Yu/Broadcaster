const BTCPriceFeed = artifacts.require("BTCPriceFeed");

module.exports = function (deployer) {
  deployer.deploy(BTCPriceFeed);
};
