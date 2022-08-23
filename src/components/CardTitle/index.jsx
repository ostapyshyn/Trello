import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/init-firebase';

const CardTitle = ({ list, removeCard, lists, id, card, index }) => {
  const [newTitle, setNewTitle] = useState(card.title);
  const [open, setOpen] = useState(false);

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
    </>
  );
};

export default CardTitle;
