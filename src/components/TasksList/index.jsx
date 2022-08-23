import React, { useContext, useState } from 'react';
import './styles.scss';

import styled from 'styled-components';
import CardTitle from '../CardTitle';

const TaskList = ({ list, removeCard, lists, id }) => {
  return (
    <>
      <div className="list-cards">
        <div className="container-cards">
          {list.cards.map((card, index) => (
            // <div key={card.id}>
            //   <h2>{card.title}</h2>
            //   <h3>test</h3>
            //   <button
            //     onClick={() => {
            //       removeCard(index, id, card.id);
            //     }}
            //   >
            //     <DeleteOutline />
            //   </button>
            // </div>
            <div className="card-content" key={card.id}>
              <CardTitle card={card} removeCard={removeCard} lists={lists} id={id} index={index} />
            </div>
          ))}
        </div>
      </div>
      {list.cards.length === 0 && (
        <ProfileCard>
          <p>There are no tasks yet!</p>
        </ProfileCard>
      )}
    </>
  );
};

export default TaskList;

const ProfileCard = styled.div`
  text-align: center;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 3px 0px 11px 0px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin-top: 4rem;
  font-weight: 500;
`;
