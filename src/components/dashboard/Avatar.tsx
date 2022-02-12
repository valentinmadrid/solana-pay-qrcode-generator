import React from "react";
import styled from "styled-components";
import { BiChevronDown } from "react-icons/bi";
const avatar = "https://img.search.brave.com/-rLo6GB3uMWXa_2Wwn_2V-zPN1WKzvbBDUs8JfIF6Iw/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9jcnlw/dG9sb2dvcy5jYy9s/b2dvcy9zb2xhbmEt/c29sLWxvZ28ucG5n";
export default function Avatar() {
  return (
    <Section>
      <div className="image">
        <img src={avatar} alt="avatar" />
      </div>
      <div className="name">
        <span>Kishan Sheth</span>
        <BiChevronDown />
      </div>
    </Section>
  );
}

const Section = styled.section`
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 0.1rem solid #242424;
  padding-bottom: 1rem;
  .image {
    img {
      height: 3rem;
      border-radius: 2rem;
    }
  }
  .name {
    display: flex;
    align-content: center;
    gap: 0.5rem;
    svg {
      color: var(--primary-color);
      font-size: 1.3rem;
    }
  }
`;
