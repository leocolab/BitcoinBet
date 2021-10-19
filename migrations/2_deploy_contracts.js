const makeBet = artifacts.require("makeBet");

module.exports = function (deployer) {
  deployer.deploy(makeBet);
};