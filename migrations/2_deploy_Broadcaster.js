const Broadcaster = artifacts.require("Broadcaster");

module.exports = function (deployer) {
  deployer.deploy(Broadcaster);
};
