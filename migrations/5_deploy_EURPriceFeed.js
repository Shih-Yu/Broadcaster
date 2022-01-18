const EURPriceFeed = artifacts.require("EURPriceFeed");

module.exports = function (deployer) {
  deployer.deploy(EURPriceFeed);
};
