import React, { useContext, useState } from 'react';

import Task from '../Card';
import './styles.scss';
import DeleteOutline from '@mui/icons-material/DeleteOutline';

const TaskList = ({ list, removeCard, lists, id }) => {
  return (
    <div>
      <div className="list-cards">
        <div className="container-cards">
          {list.cards.map((card, index) => (
            <div key={card.id}>
              <h2>{card.title}</h2>
              {/* <h3>test</h3> */}
              <button
                onClick={() => {
                  removeCard(index, id, card.id);
                }}
              >
                <DeleteOutline />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* <InputContainer listId={list.id} type="card" /> */}
    </div>
  );
};

export default TaskList;
