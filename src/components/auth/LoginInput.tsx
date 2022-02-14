import React from "react";
import styled from "styled-components";
import { cardStyle } from "../styles/CardStyle";
import { BsChevronRight } from "react-icons/bs";
import { useEffect, useState } from "react"
import { supabase } from "../../client"
import { SiGnuprivacyguard } from "react-icons/si";
import { Navigate, useNavigate } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";

function LoginInput() {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const [submitted, setSubmitted] = useState(false)

async function SignIn(email, password) {
  const navigate = useNavigate()
  try{
  if (!email) return;
  const { error } = await supabase.auth.signIn(email, password)
  if(error) throw error
  navigate('/dashboard')
  }
  catch(error){
    alert(error)
  }
}

async function SignUp(email, password, event) {
  const navigate = useNavigate()
  event.preventDefault()
  if (!email) return;
  try{
  const { error } = await supabase.auth.signUp(email, password)
  if(error) throw error
  navigate('/dashboard')
  }
  catch(error){
    alert(error)
  }
}


  return (
    <Section>
      <div className="title-container">
        <div className="title">
          <h4>Login</h4>
        </div>
<form>
    <input
        onChange={e=> setEmail(e.target.value)}
        type="text"
        placeholder="eMail adress"
        value={email}
    />
        <input
        onChange={e=> setPassword(e.target.value)}
        type="password"
        placeholder="password"
        value={password}
    />

<button onClick={() => SignIn(email, password)}> sign in </button>
<button onClick={() => SignUp(email, password)}>Sign Up</button>

</form>
   

      </div>
    </Section>
  );
}

const Section = styled.section`
  ${cardStyle}
  color:white;
  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    .title {
    }
    .filters {
      display: flex;
      align-items: center;
      gap: 3rem;
      color: var(--primary-color);
      button {
        background-color: var(--primary-color);
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem 0.8rem;
        cursor: pointer;
        font-weight: bolder;
      }
    }
  }
  .musics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    .music {
      border-bottom: 0.1rem solid #242424;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .details {
        display: flex;
        gap: 1rem;
        .image {
          img {
            height: 2.5rem;
          }
        }
        .info {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          h6 {
            font-weight: 100;
          }
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .title-container {
      flex-direction: column;
      gap: 0.5rem;
      .filters {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
    .musics {
      grid-template-columns: 1fr;
    }
  }
`;

export default LoginInput;
