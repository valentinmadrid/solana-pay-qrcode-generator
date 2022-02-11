import React, { FC, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { Cluster, clusterApiUrl, Connection, PublicKey, Keypair } from '@solana/web3.js';
import QRCode from "./QRCode"
import config from "./config.json"


process.env.REFERENCE = config.reference || ``;
process.env.LABEL = config.label || ``;
process.env.MESSAGE = config.message  || ``;
process.env.MEMO = config.memo || ``;
process.env.RECIPIENT = config.recipient || ``;

function App() {

  async function main() {
      let paymentStatus: string;
      console.log('1. ✅ Establish connection to the network');
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  }


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


