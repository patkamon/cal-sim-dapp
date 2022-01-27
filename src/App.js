import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import NDToken from './artifacts/contracts/Token.sol/NDToken.json'

const tokenAddress = "TOKEN_ADDRESS"

function App() {
  const [ans, setAns] = useState()
  const [op, setOp] = useState()
  const [B, setB] = useState()
  const [A, setA] = useState()
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()

  const owner = 'OWNER'

  const [result, setResult] = useState()

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function payCal() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      setResult('processing');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, NDToken.abi, signer);
      const transation = await contract.transferC(owner, 10);
      await transation.wait();
      console.log(`10 Coins successfully pay to admin`);

      await setOp(document.getElementById('op').value);
      // let temp_ans = await calculator(`${Number(A)}`, `${Number(B)}`, `${String(op)}`);
      let temp;
      let o = String(op);
      if (o === 'plus') {
        temp = Number(A) + Number(B);
        await setAns(Number(temp));
      }
      else if (o === 'sub') {
        temp = Number(A) - Number(B);
        await setAns(Number(temp));
      }
      else if (o === 'mul') {
        temp = Number(A) * Number(B);
        await setAns(Number(temp));
      }
      else if (o === 'div') {
        temp = Number(A) / Number(B);
        await setAns(Number(temp));
      }
      console.log(`${A} ${String(op)} ${B} = ${Number(ans)} `);
      await setResult(Number(ans));
    }
  }

  // async function calculator(a, b, o) {
  //   let temp;
  //   if (o === 'plus') {
  //     temp = Number(a) + Number(b);
  //     return temp;
  //   }
  //   else if (o === 'sub') {
  //     temp = Number(a) - Number(b);
  //     return temp;
  //   }
  //   else if (o === 'mul') {
  //     temp = Number(a) * Number(b);
  //     return temp;
  //   }
  //   else if (o === 'div') {
  //     temp = Number(a) / Number(b);
  //     return temp;
  //   }
  // }

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

        <label for="op">Choose an operator:</label>

        <select name="op" id="op">
          <option value="plus">+</option>
          <option value="sub">-</option>
          <option value="mul">*</option>
          <option value="div">/</option>
        </select>

        <p></p>

        <input onChange={e => setB(e.target.value)} placeholder="B" />

        <button onClick={payCal}>Calculate</button>
        <p>{result}</p>

        <br />
        <button onClick={sendCoins}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      </header>
    </div>
  );
}

export default App;