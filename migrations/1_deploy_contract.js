const My_Contract = artifacts.require("MyContract");

module.exports = function(deployer) {
  deployer.deploy(My_Contract);
};