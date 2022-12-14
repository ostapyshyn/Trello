import React, { useContext, useState, useEffect } from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import closeSvg from '../../assets/svg/close.svg';
import { Draggable } from 'react-beautiful-dnd';
import { db } from '../../lib/init-firebase';
import storeApi from '../../utils/storeApi';
import { useParams } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import useOutsideClick from '../../hooks/useOnClickOutside';

import './styles.scss';

import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  updateDoc,
  documentId,
} from 'firebase/firestore';
import { useRef } from 'react';
import { style } from '@mui/system';

export default function Card({ card, index, listId }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { removeCard, updateCardTitle } = useContext(storeApi);
  const [lists, setLists] = useState([]);
  const [users, setUsers] = useState([]);
  const [boards, setBoards] = useState([]);
  const params = useParams();

  const ref = useOutsideClick(() => setVisiblePopup(false));

  const handleOnBlur = (cardId) => {
    updateCardTitle(newTitle, index, listId);
    setOpen(!open);
  };

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    console.log('onClose');
  };

  const emailRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emailRef.current && !emailRef.current.contains(event.target)) {
        setVisiblePopup(false);
        setInputValue('');
      }
    };
    document.body.addEventListener('click', handleClickOutside, true);
    return () => {
      document.body.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'lists'), where('board', '==', params.board));
    onSnapshot(q, (snapShot) => {
      setLists(
        snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }),
      );
    });

    const users = query(collection(db, 'lists'));
    onSnapshot(users, (snapShot) => {
      setUsers(
        snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }),
      );
    });

    const boards = query(collection(db, 'boards'));
    onSnapshot(boards, (snapShot) => {
      setBoards(
        snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }),
      );
    });
  }, [params.board]);

  const addUserEmail = (usr_email, index, listId, cardId, lists) => {
    const listRef = doc(db, 'lists', listId);

    // console.log('usr_email+:', usr_email);
    // console.log('listId+:', listId);
    // console.log('index:', index);
    // console.log('cardId+:', cardId);
    // console.log('lists+:', lists);
    // console.log('board:', lists.users);
    // console.log('users:', users);

    lists.forEach(async (list) => {
      if (list.id === listId) {
        // list.cards[index].title = usr_email;
        await updateDoc(listRef, {
          cards: list.cards.map((card) => {
            if (card.id === cardId) {
              card.users.push(usr_email);
              return card;
            }
            return card;
          }),
        });
      }
      return list;
    });
  };

  const removeUserEmail = (usr_email, index, listId, cardId, lists) => {
    const listRef = doc(db, 'lists', listId);

    // console.log('usr_email+:', usr_email);
    // console.log('listId+:', listId);
    // console.log('index:', index);
    // console.log('cardId+:', cardId);
    // console.log('lists+:', lists);
    // console.log('board:', lists.users);
    // console.log('users:', users);

    console.log('inside remove');
    lists.forEach(async (list) => {
      if (list.id === listId) {
        await updateDoc(listRef, {
          cards: list.cards.map((card) => {
            if (card.id === cardId) {
              for (let i = 0; i < card.users.length; i++) {
                if (card.users[i] === usr_email) {
                  card.users.splice(i, 1);
                }
              }
              return card;
            }
            return card;
          }),
        });
      }
      return list;
    });
  };

  function checkEmail(email) {
    let board = boards.filter((board) => board.id === params.board);
    return board[0].users.includes(email);
  }

  const addList = () => {
    if (!inputValue) {
      alert('Enter user email');
      return;
    }
    if (!checkEmail(inputValue)) {
      alert('User should be invited to the board');
      return;
    }

    if (checkDuplicates(inputValue)) {
      alert('User already added');
      return;
    }

    addUserEmail(inputValue, index, listId, card.id, lists);
    setInputValue('');
  };

  const handleDelete = (email) => {
    console.log(email);
    // const usersEmails = users.filter((item) => item !== email);
    removeUserEmail(email, index, listId, card.id, lists);
    // dispatch(fetchBoards());
  };

  function showEmails() {
    let list = users.filter((user) => user.id === listId);
    let newlist = list[0].cards.filter((cards) => cards.id === card.id);
    return newlist[0].users.map((user, index) => (
      <div key={index} className="removeUser">
        {user} <FiX onClick={() => handleDelete(user)} role="button" />
      </div>
    ));
  }

  function checkDuplicates(email) {
    let list = users.filter((user) => user.id === listId);
    let newlist = list[0].cards.filter((cards) => cards.id === card.id);
    return newlist[0].users.includes(email);
  }

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
              <div className="task-title-btn">
                <div onClick={() => setOpen(!open)} className="card-title-container">
                  <p style={{ flex: 1 }}>{card.title}</p>
                  <button
                    onClick={() => {
                      removeCard(index, listId, card.id);
                    }}>
                    <DeleteOutline />
                  </button>
                </div>
                <button onClick={() => setVisiblePopup(!visiblePopup)} ref={ref}>
                  <PersonAddIcon />
                </button>
              </div>
            )}
          </div>
          {visiblePopup && (
            <div className="add-email__popup">
              <div>
                <img
                  onClick={onClose}
                  src={closeSvg}
                  alt="Close button"
                  className="add-email__popup-close-btn"
                />
                <button type="button" onClick={() => setShow(!show)} className="showUsers">
                  {show ? 'Hide' : 'Show'} task users
                </button>
                {show && showEmails()}
              </div>

              <div className="addUser">
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
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
