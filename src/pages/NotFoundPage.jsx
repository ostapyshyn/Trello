import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPage = () => {
  return (
    <ProfileCard>
      <h1>Sorry! This page doesn't exist.</h1>
      <LinkHome>
        <Link to="/">Go to Home Page!</Link>
      </LinkHome>
    </ProfileCard>
  );
};

const LinkHome = styled.p`
  text-decoration: underline;
  color: hotpink;
`;

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

export default NotFoundPage;
