// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract EURPriceFeed {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Rinkeyby
     * Aggregator: EUR/USD
     * Address: 0x78F9e60608bF48a1155b4B2A5e31F32318a1d85F
     */
    constructor() {
        priceFeed = AggregatorV3Interface(0x78F9e60608bF48a1155b4B2A5e31F32318a1d85F);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}