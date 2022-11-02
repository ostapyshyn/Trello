import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import TaskList from '../components/TasksList';
import { doc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';

export const TaskManage = () => {
  const [lists, setLists] = useState([]);
  const params = useParams();

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const removeCard = async (index, listId, cardId) => {
    const listRef = doc(db, 'lists', listId);

    lists.forEach(async (list) => {
      if (list.id === listId) {
        list.cards.splice(index, 1);
        await updateDoc(listRef, {
          cards: list.cards.filter((card) => card.id !== cardId),
        });
      }
      return list;
    });
  };

  useEffect(() => {
    const q = query(collection(db, 'lists'));
    onSnapshot(q, (snapShot) => {
      setLists(
        snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }),
      );
    });
  }, []);

  return (
    <main style={{ padding: '20px' }}>
      <BackButton onClick={goBack}>Go back</BackButton>
      {lists
        .filter((list) => list.id === params.id)
        .map((list) => {
          return (
            <TaskList
              list={list}
              key={list.id}
              lists={lists}
              removeCard={removeCard}
              id={params.id}
            />
          );
        })}
    </main>
  );
};

const BackButton = styled.button`
  min-width: 130px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  overflow: hidden;
  border-radius: 5px;
  border: none;
  background-color: #3d348b;
  margin-bottom: 20px;

  &:hover {
    border-radius: 5px;
    padding-right: 24px;
    padding-left: 8px;
  }

  &:hover:after {
    opacity: 1;
    right: 10px;
  }

  &:after {
    content: '←';
    position: absolute;
    opacity: 0;
    font-size: 20px;
    line-height: 40px;
    top: 0;
    right: -20px;
    transition: 0.4s;
  }
`;
