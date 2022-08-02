import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { tasksCollectionRef } from '../lib/firestore.collections';

export default function ListOfTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  });

  function getTasks() {
    getDocs(tasksCollectionRef).then((data) => {
      setTasks(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  }
  return (
    <div>
      <h3>List of tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
