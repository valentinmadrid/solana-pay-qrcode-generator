import React, { FC, Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { Cluster, clusterApiUrl, Connection, PublicKey, Keypair } from '@solana/web3.js';
import QRCode from "./QRCode"
import Sidebar from "./Sidebar"
import config from "./config.json"
import styled from "styled-components";
import scrollreveal from "scrollreveal";
import Dashboard from "./Dashboard"
import RightSidebar from './RightSidebar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Link
} from "react-router-dom";
import Streams from './Streams';



process.env.REFERENCE = config.reference || ``;
process.env.LABEL = config.label || ``;
process.env.MESSAGE = config.message  || ``;
process.env.MEMO = config.memo || ``;
process.env.RECIPIENT = config.recipient || ``;



function App() {

  useEffect(() => {
    const sr = scrollreveal({
      origin: "left",
      distance: "80px",
      duration: 1000,
      reset: false,
    });
    sr.reveal(
      `
       #sidebar
    `,
      {
        opacity: 0,
      }
    );
    const sr2 = scrollreveal({
      origin: "right",
      distance: "80px",
      duration: 1000,
      reset: false,
    });
    sr2.reveal(
      `
       #rightSidebar
    `,
      {
        opacity: 0,
      }
    );
  }, []);

  async function main() {
      let paymentStatus: string;
      console.log('1. ✅ Establish connection to the network');
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  }


  return (
<Div>
  <Router>
    <Routes>
      <Fragment>


      <Route
      path="dashboard/*"
      element={
        <>
        <Sidebar />
        <Dashboard />
        <RightSidebar />
        </>
      }
    />

      <Route
        path="auth/login"
        element={
          <>
          <Sidebar />
          <Dashboard />
          <RightSidebar />
          </>
        }
      />
          
      </Fragment>
    </Routes>
  </Router>
</Div>


  );
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 12fr 4fr;
  min-height: 100vh;
  height: max-content;
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    grid-template-columns: 1fr;
    height: max-content;
  }
`;


export default App;


