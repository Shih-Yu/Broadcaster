import { useState } from "react";
import './App.css';
import { ethers } from "ethers";
import broadcaster from "../src/build/Broadcaster.json";
import EthPriceFeed from "../src/build/EthPriceFeed.json";
import BTCPriceFeed from "../src/build/BTCPriceFeed.json";
import EURPriceFeed from "../src/build/EURPriceFeed.json";

// Contract Addressses
const broadcasterAddress = "0x42C5B8291442437a40732E63cDE72bC6323C42C0";
const EthPriceFeedAddress = "0x5B9E873d24479Ae61f19a0B1D4d3C2C1c7dd3c22";
const BTCPriceFeedAddress = "0xE9db6B4f63E7c074296a461964737d3A7081F6b1";
const EURPriceFeedAddress = "0x51656bD0400d00F2C5D561a2FF35E3Ad3bD992FD";

function App() {
  // setting state for price updates
  const [ethPrice, setEthPrice] = useState();
  const [BTCPrice, setBTCPrice] = useState();
  const [EURPrice, setEURPrice] = useState();


  // Request account from Metamask wallet and prompt user to connect if not connect
  // Connect to wallet provider of webpage
  async function connect() {
     window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.etherum);
    const signer = provider.signer();
  }

   // Get Eth price from Chainlink PriceFeed
   async function getEth() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Using Ethers.js to call the contract on Rinkeby Testnet
    const contract = new ethers.Contract(EthPriceFeedAddress, EthPriceFeed.abi, provider);
    try {
      const data = await contract.getLatestPrice();
      //  Convert price to readable number
      let price = ethers.utils.formatEther(data) * 10e9;
      //  set State to price from pricefeed
      setEthPrice(price.toFixed(2));
    } catch (error) {
      console.error("Error", error);
    }
   }
  
    // Get BTC price from Chainlink PriceFeed
    async function getBTC() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Using Ethers.js to call the contract on Rinkeby Testnet
      const contract = new ethers.Contract(BTCPriceFeedAddress, BTCPriceFeed.abi, provider);
      try {
        const data = await contract.getLatestPrice();
        //  Convert price to readable number
        let price = ethers.utils.formatEther(data) * 10e9;
        //  set State to price from pricefeed
        setBTCPrice(price.toFixed(2));
      } catch (error) {
        console.error("Error", error);
      }
    }
  
  // Get BTC price from Chainlink PriceFeed
  async function getEUR() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Using Ethers.js to call the contract on Rinkeby Testnet
    const contract = new ethers.Contract(EURPriceFeedAddress, EURPriceFeed.abi, provider);
    try {
      const data = await contract.getLatestPrice();
      //  Convert price to readable number
      let price = ethers.utils.formatEther(data) * 10e9;
      //  set State to price from pricefeed
      setEURPrice(price.toFixed(2));
    } catch (error) {
      console.error("Error", error);
    }
  }


  // Function to tip broadcaster
  async function tip() {
    // Using Ethers.js to call the contract on Rinkeby Testnet
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Get account from the wallet to use for transaction
    const signer = provider.getSigner();
    // Getting contract to access tip function
    let contract = new ethers.Contract(broadcasterAddress, broadcaster.abi, signer);
    try {
      let transaction = await contract.tip();
      await transaction.wait();
    } catch (error) {
      // Dipslay alert if wallet address is the owner
      alert("Owners cannot tip themselves");
    }

  }
  
  return (
    <div className="App App-header">
      <header className="App-header">
        <h1>Welcome to Broadcaster</h1>
        <button className="connect" onClick={ connect }>Connect Wallet</button>
        <div className="flex-container">
        <button onClick={ getEth() }>Eth/USD:$ { ethPrice }</button>
        <button onClick={ getBTC() }>BTC/USD:$ { BTCPrice}</button>
        <button onClick={ getEUR() }>EUR/USD:$ { EURPrice}</button>
        </div>
        <iframe
        src="https://cdn.jwplayer.com/players/yPdwJR8o-qHcvMMW9.html"
        width="640"
        height="360"
        frameborder="0"
        scrolling="auto"
        title="WebDemo"
        allowfullscreen
      ></iframe>
      <button className="tip" onClick={tip}>Tip</button>
      </header>
    </div>
  );
}

export default App;
