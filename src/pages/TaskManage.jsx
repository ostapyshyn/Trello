import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import List from '../components/List';

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
          return <List list={list} key={list.id} />;
        })}
    </div>
  );
};
