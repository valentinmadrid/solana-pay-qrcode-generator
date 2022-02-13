import React from "react";
import styled from "styled-components";
import { cardStyle } from "../styles/CardStyle";
import { BsChevronRight } from "react-icons/bs";
import { useEffect, useState } from "react"
import { supabase } from "../../client"
import { Navigate } from 'react-router-dom';

function ProfileEdit() {
const [profile, setProfile] = useState(null)

useEffect(() => {
    fetchProfile()
}, [])

async function fetchProfile() {
    const profileData = await supabase.auth.user()
    console.log("profileData: ", profileData)
    if (!profileData) {
    return <Navigate to="/login" />;
} else {
    setProfile(profileData)
  }
}

if (!profile) return null



  return (
    <Section>
      <div className="title-container">
        <div className="title">
          <h1>My profile</h1>
          <p>Hello {profile.email}</p>
          <p>userid: {profile.id}</p>
        </div>



          );

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

export default ProfileEdit;
