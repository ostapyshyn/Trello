import React, { useContext, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

import storeApi from '../../utils/storeApi';

import './styles.scss';

export default function InputCard({ setOpen, listId, type }) {

  
  const { addMoreCard, addMoreList } = useContext(storeApi);
  const [title, setTitle] = useState('');

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBtnConfirm = () => {
    if (type === 'card') {
      addMoreCard(title, listId);
    } else {
      addMoreList(title);
    }
    setOpen(false);
    setTitle('');
  };

  return (
    <div className="input-card">
      <div className="input-card-container">
        <textarea
          onChange={handleOnChange}
          value={title}
          className="input-text"
          placeholder={type === 'card' ? 'Enter a title of this task...' : 'Enter list title'}
          autoFocus
        />
      </div>
      <div className="confirm">
        <button className="button-confirm" onClick={handleBtnConfirm}>
          {type === 'card' ? 'Add Task' : 'Add List'}
        </button>
        <button
          className="button-cancel"
          onClick={() => {
            setTitle('');
            setOpen(false);
          }}>
          <ClearIcon />
        </button>
      </div>
    </div>
  );
}
