import React, { FC, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { Cluster, clusterApiUrl, Connection, PublicKey, Keypair } from '@solana/web3.js';
import {encodeURL, createQR} from '@solana/pay'
import BigNumber from 'bignumber.js'
import QRCode from "./QRCode"





let wallet="";
let amount="";
let token="";

function App() {

  async function main() {
      // Variable to keep state of the payment status
      let paymentStatus: string;
  
      // Connecting to devnet for this example
      console.log('1. ✅ Establish connection to the network');
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  }

  console.log('2. 🛍 Simulate a customer checkout \n');
const amount = new BigNumber(1);
const reference = new Keypair().publicKey;
const label = 'Jungle Cats store';
const message = 'Jungle Cats store - your order - #001234';
const memo = 'JC#4098';
const recipient = new PublicKey("CuieVDEDtLo7FypA9SbLM9saXFdb1dsshEkyErMqkRQq")
console.log('3. 💰 Create a payment request link \n');
const url = encodeURL({ recipient: recipient, amount, reference, label, message, memo });
const qrCode = createQR(url, 1024, "white", "black" );
const element = document.getElementById('qrcode')!;

qrCode.append(element)
  return (
    <div className="App">
      <header className="App-header">
        <button>Generate QR Code</button>
        <QRCode />
      </header>
    </div>
  );
}


export default App;


