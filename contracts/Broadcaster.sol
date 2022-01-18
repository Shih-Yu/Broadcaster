// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

/** 
  Contract:
    *Use Chainlink to display current price of currencies interface
    *
**/

interface PriceFeed {
  function getLatestPrice() external view returns(uint);
}

contract Broadcaster {
  // Assign deployer the owner of the contract and can receive payment
  address payable public owner;
  // Balance of this contract
  uint public balance;


constructor() {
    owner = payable (msg.sender);
}

// Function for tipping the broadcaster
function tip() public payable {
  // Checking that person tipping is not the owner
  require(msg.sender != owner, "Owner cannot tip themselves");
  // Send tip  to the contract
  payable (msg.sender).transfer(msg.value);
  // Updates balnce of the contract
  balance += msg.value;
}

}
