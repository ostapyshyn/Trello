import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import TaskList from '../components/TasksList';

export const TaskManage = () => {
  const [lists, setLists] = useState([]);
  const params = useParams();

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
          return <TaskList list={list} key={list.id} />;
          // return <h1>{list.title}</h1>;
        })}
    </div>
  );
};
