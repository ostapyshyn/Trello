import React, { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import { Link } from 'react-router-dom';
import InputCard from '../InputCard';

import './styles.scss';

export default function InputContainer({ listId, type }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="input-container">
      <Collapse in={open}>
        <InputCard setOpen={setOpen} listId={listId} type={type} />
      </Collapse>
      <Collapse in={!open}>
        <div className="input-content">
          <button onClick={() => setOpen(!open)}>
            {type === 'card' ? '+ Add Card' : '+ Add List'}
          </button>
        </div>
        {type === 'card' && (
          <Link to={`/board/tasks/${listId}`} className="categoryListingLink">
            <button className="buttonManage">Manage tasks</button>
          </Link>
        )}
      </Collapse>
    </div>
  );
}
