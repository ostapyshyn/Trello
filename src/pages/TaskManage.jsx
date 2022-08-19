import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import TaskList from '../components/TasksList';
import { doc, updateDoc } from 'firebase/firestore';

export const TaskManage = () => {
  const [lists, setLists] = useState([]);
  const params = useParams();

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
        })
      );
    });
  }, []);

  return (
    <div>
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
          // return <h1>{list.title}</h1>;
        })}
    </div>
  );
};
