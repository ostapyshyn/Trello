import React from 'react';
import styled from 'styled-components';
const AboutPage = () => {
  return (
    <ProfileCard>
      <h1>About us</h1>
      <h2>Hello There!</h2>
      <p>This is a demo Trello project!</p>
    </ProfileCard>
  );
};

const ProfileCard = styled.div`
  text-align: center;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 3px 0px 11px 0px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin-top: 4rem;
`;

export default AboutPage;
