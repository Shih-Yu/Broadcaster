// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceFeed {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Rinkeyby
     * Aggregator: BTC/USD
     * Address: 0xECe365B379E1dD183B20fc5f022230C044d51404
     */
    constructor() {
        priceFeed = AggregatorV3Interface(0xECe365B379E1dD183B20fc5f022230C044d51404);
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