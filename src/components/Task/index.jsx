import React, { useContext, useState } from 'react';

import './styles.scss';

export default function Task({ card }) {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);

  // const handleOnBlur = (cardId) => {
  //   updateCardTitle(newTitle);
  //   setOpen(!open);
  // };

  return <div>card.title</div>;
}
