import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import NDToken from './artifacts/contracts/Token.sol/NDToken.json'

const tokenAddress = "SMART CONTRACT TOKEN ADDRESS"

function App() {
  const [B, setB] = useState()
  const [A, setA] = useState()
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()

  const owner = 'ADMIN WALLET ADDRESS'

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function payCal() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, NDToken.abi, signer);
      const transation = await contract.transferC(owner, 10);
      await transation.wait();
      console.log(`${amount} Coins successfully pay to admin`);
      console.log(`${A + B} `);
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, NDToken.abi, signer);
      const transation = await contract.transferC(userAccount, amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input onChange={e => setA(e.target.value)} placeholder="A" />
        <input onChange={e => setB(e.target.value)} placeholder="B" />
        <button onClick={payCal}>Calculate</button>

        <br />
        <button onClick={sendCoins}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      </header>
    </div>
  );
}

export default App;