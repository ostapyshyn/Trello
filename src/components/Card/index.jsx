import React, { useContext, useState } from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import closeSvg from '../../assets/svg/close.svg';
import { Draggable } from 'react-beautiful-dnd';

import storeApi from '../../utils/storeApi';

import './styles.scss';

export default function Card({ card, index, listId }) {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { removeCard, updateCardTitle } = useContext(storeApi);

  const handleOnBlur = (cardId) => {
    updateCardTitle(newTitle, index, listId);
    setOpen(!open);
  };

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
  };

  const addList = () => {
    if (!inputValue) {
      alert('Enter user email');
      return;
    }
    console.log(inputValue);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          <div className="card-content">
            {open ? (
              <TextareaAutosize
                type="text"
                className="input-card-title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={handleOnBlur}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleOnBlur(card.id);
                  }
                  return;
                }}
                autoFocus
              />
            ) : (
              <div onClick={() => setOpen(!open)} className="card-title-container">
                <p style={{ flex: 1 }}>{card.title}</p>
                <button
                  onClick={() => {
                    removeCard(index, listId, card.id);
                  }}>
                  <DeleteOutline />
                </button>
                <button onClick={() => setVisiblePopup(true)}>
                  <PersonAddIcon />
                </button>
              </div>
            )}
            {visiblePopup && (
              <div className="add-email__popup">
                <img
                  onClick={onClose}
                  src={closeSvg}
                  alt="Close button"
                  className="add-email__popup-close-btn"
                />

                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="field"
                  type="text"
                  placeholder="Enter user email"
                />
                <button onClick={addList} className="button">
                  {'Assign task to a user'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
