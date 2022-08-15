import React from 'react';
import { Link } from 'react-router-dom';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import trelloBoard from '../assets/svg/trelloBoard.svg';
import styled from 'styled-components';

const HomePage = () => {
  return (
    <Wrapper>
      <Link to="/create-board">
        <CreateBoard>
          <img src={trelloBoard} alt="home" />
          <p>Create board</p>
          <img src={arrowRight} alt="arrow right" />
        </CreateBoard>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
`;

const CreateBoard = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  max-width: 500px;
  justify-content: space-between;
  align-items: center;
  border-radius: 1rem;
  padding: 0.25rem 1rem;
  font-weight: 600;
`;

export default HomePage;
