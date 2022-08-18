import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import board from '../assets/board.png';

const BoardItem = ({ boardData, id }) => {
  return (
    <Link to={`/boards/${id}`} className="categoryListingLink">
      <BoardItemList>{boardData.name}</BoardItemList>
    </Link>
  );
};

export default BoardItem;

const BoardItemList = styled.li`
  display: flex;
  flex-direction: row;
  width: 192px;
  height: 97px;
  border-radius: 10px;
  background-image: url(${board});
  color: white;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 20px 35px rgba(5, 5, 5, 0.06);
    transform: translateY(-5px);
  }
`;
