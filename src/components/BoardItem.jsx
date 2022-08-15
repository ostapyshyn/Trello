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
`;
