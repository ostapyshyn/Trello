import React, { useContext, useState } from 'react';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import TextareaAutosize from 'react-textarea-autosize';
import './styles.scss';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/init-firebase';
import styled from 'styled-components';

const TaskList = ({ list, removeCard, lists, id }) => {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const updateCardTitle = (title, index, listId, cardId) => {
    const listRef = doc(db, 'lists', listId);

    lists.forEach(async (list) => {
      if (list.id === listId) {
        list.cards[index].title = title;
        await updateDoc(listRef, {
          cards: list.cards.map((card) => {
            if (card.id === cardId) {
              card.title = title;
              return card;
            }
            return card;
          }),
        });
      }
      return list;
    });
  };

  const handleOnBlur = (cardId, index) => {
    updateCardTitle(newTitle, index, id);
    setOpen(!open);
  };

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
            <div className="card-content">
              {open ? (
                <TextareaAutosize
                  type="text"
                  className="input-card-title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onBlur={() => handleOnBlur(card.id, index)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleOnBlur(card.id, index);
                    }
                    return;
                  }}
                  autoFocus
                />
              ) : (
                <div onClick={() => setOpen(!open)} className="card-title-container">
                  <p>{card.title}</p>
                  <button
                    onClick={() => {
                      removeCard(index, id, card.id);
                    }}
                  >
                    <DeleteOutline />
                  </button>
                </div>
              )}
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
