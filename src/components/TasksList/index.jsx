import React from 'react';

import Task from '../Card';
import './styles.scss';

const TaskList = ({ list }) => {
  return (
    <div>
      <div className="list-cards">
        <div className="container-cards">
          {list.cards.map((card) => (
            <>
              <h2>{card.title}</h2>
              <h3>test</h3>
            </>
          ))}
        </div>
      </div>
      {/* <InputContainer listId={list.id} type="card" /> */}
    </div>
  );
};

export default TaskList;
