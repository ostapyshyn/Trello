import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { arrayUnion, doc, updateDoc, onSnapshot, query, collection } from 'firebase/firestore';
import styled from 'styled-components';
import styles from '../assets/styles/sendInvite.module.scss';
import { db } from '../lib/init-firebase';

import ClearIcon from '@mui/icons-material/Clear';
import { FiX } from 'react-icons/fi';

import { fetchBoards } from '../redux/slices/boardsSlice';

let users = '';

const SendInvitePage = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boardsSlice.boards);

  const form = useRef();
  const location = useLocation();
  const board_id = location.state;

  useEffect(() => {
    const getBoards = async () => {
      dispatch(fetchBoards());
    };
    getBoards();
  }, [dispatch]);

  const { email } = formData;

  const addMoreUsers = async (email, boardId) => {
    const boardRef = doc(db, 'boards', boardId);

    await updateDoc(boardRef, {
      users: arrayUnion(email),
    });
  };

  const removeUsers = async (emails, boardId) => {
    const boardRef = doc(db, 'boards', boardId);

    await updateDoc(boardRef, {
      //users: arrayUnion(email.),
      users: emails,
    });
  };

  const onMutate = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleDelete = (email) => {
    const usersEmails = users.filter((item) => item !== email);
    removeUsers(usersEmails, board_id);
    dispatch(fetchBoards());
  };

  function showUsers() {
    let board = boards.filter((board) => board.id === board_id);

    users = board[0]?.users;
    console.log(users);

    return users?.map((user, index) => {
      return (
        <div key={index} className={styles.user}>
          <span>{user}</span>
          <FiX onClick={() => handleDelete(user)} role="button" />
        </div>
      );
    });
  }

  const goBack = () => navigate(-1);

  const sendEmail = (e) => {
    e.preventDefault();

    addMoreUsers(email, board_id);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_USER_ID,
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log('message sent');
          toast.success('Invite sent!');
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        },
      );
    dispatch(fetchBoards());
  };

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flexStart',
          alignItems: 'center',
          width: '100%',
          marginLeft: '20px',
        }}>
        <BackButton onClick={goBack}>Go back</BackButton>
      </div>
      <button type="button" onClick={() => setShow(!show)} className={styles.showUsers}>
        {show ? 'Hide' : 'Show'} currrent boards users
      </button>
      {show && showUsers()}

      <h2>Invite a user to the board:</h2>
      <StyledContactForm>
        <form ref={form} onSubmit={sendEmail}>
          <label>User name</label>
          <input type="text" name="user_name" required />
          <label>Email</label>
          <input
            type="email"
            name="user_email"
            id="email"
            value={email}
            onChange={onMutate}
            required
          />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" required />
        </form>
      </StyledContactForm>
    </main>
  );
};

export default SendInvitePage;

const StyledContactForm = styled.div`
  width: 400px;
  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;
    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }
    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }
    label {
      margin-top: 1rem;
    }
    input[type='submit'] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
      box-shadow: 2px 2px 5px #000;
    }
  }
`;

const BackButton = styled.button`
  min-width: 130px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  overflow: hidden;
  border-radius: 5px;
  border: none;
  background-color: #3d348b;

  &:hover {
    border-radius: 5px;
    padding-right: 24px;
    padding-left: 8px;
  }

  &:hover:after {
    opacity: 1;
    right: 10px;
  }

  &:after {
    content: '←';
    position: absolute;
    opacity: 0;
    font-size: 20px;
    line-height: 40px;
    top: 0;
    right: -20px;
    transition: 0.4s;
  }
`;
