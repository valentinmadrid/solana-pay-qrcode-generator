import React, { FC, Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { Cluster, clusterApiUrl, Connection, PublicKey, Keypair } from '@solana/web3.js';
import QRCode from "./QRCode"

import config from "./config.json"
import styled from "styled-components";
import scrollreveal from "scrollreveal";

import { supabase } from './client';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Link
} from "react-router-dom";
import Streams from './components/dashboard/Streams';

//Dashboard
import SideBarLeft from "./components/dashboard/SideBarLeft"
import Dashboard from './pages/Dashboard';
import SideBarRight from "./components/dashboard/SideBarRight"

import Login from "./pages/Login"
import Profile from './pages/Profile';


function App() {

  const [authenticatedstate, setAuthenticatedState] = useState('not authenticated')
async function checkUser() {
  const user = await supabase.auth.user() 
  if (user) {
    setAuthenticatedState('authenticated')
  }
}

async function handleAuthChange(event, session) {
  await fetch('/api/auth', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ event, session }),
  })
}
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session)
      if (event === 'SIGNED_IN') {
        setAuthenticatedState('authenticated')
      }
      if (event === 'SIGNED_OUT') {
        setAuthenticatedState('not-authenticated')
      }
    })
    checkUser()
    return () => {
      authListener.unsubscribe()
    }
  }, [])

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

  return (
<Div>
  <Router>
    <Routes>
      <Route
      path="dashboard/*"
      element={
        <>
        <SideBarLeft />
        <Dashboard />
        <SideBarRight />
        </>
      }
    />
      <Route
      path="profile"
      element={
        <>
<Profile />
        </>
      }
    />
      <Route
        path="auth/login"
        element={
          <>
          <Login />
          </>
        }
      />
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


