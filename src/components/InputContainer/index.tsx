import React, { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import { Link } from 'react-router-dom';
import InputCard from '../InputCard';

import './styles.scss';

type InputContainerProps = {
  listId: string;
  type: string;
};

const InputContainer: React.FC<InputContainerProps> = ({ listId, type }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="input-container">
      <Collapse in={open}>
        <InputCard setOpen={setOpen} listId={listId} type={type} />
      </Collapse>
      <Collapse in={!open}>
        <div className="input-content">
          <button onClick={() => setOpen(!open)}>
            {type === 'card' ? '+ Add Task' : '+ Add List'}
          </button>
        </div>
        {type === 'card' && (
          <Link to={`/board/tasks/${listId}`} className="categoryButtonLink">
            <button className="buttonManage">Manage tasks</button>
          </Link>
        )}
      </Collapse>
    </div>
  );
};

export default InputContainer;
