import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../lib/init-firebase';
import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';
import { IoArrowBackOutline } from 'react-icons/io5';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import styled from 'styled-components';
import Home from './Home/Home';
import styles from '../assets/styles/boardsLists.module.scss';

const BoardLists = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const goBack = () => navigate(-1);

  const deleteBoard = async (boardId) => {
    if (window.confirm('Are you sure you want to delete this board?')) {
      await deleteDoc(doc(db, 'boards', boardId));
      navigate(-1);
    }
  };

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'boards', params.board);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Main>
      <ShareIconDiv
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}>
        <img src={shareIcon} alt="shareIcon" />
      </ShareIconDiv>
      {shareLinkCopied && <LinkCopied>Link Copied!</LinkCopied>}
      {/* <BackButton onClick={goBack}>Go back</BackButton> */}
      <div className={styles.menu}>
        <IoArrowBackOutline onClick={goBack} className={styles.backButton} />
        <DeleteButton onClick={() => deleteBoard(params.board)}>Delete board</DeleteButton>
        <Link style={{ display: 'revert' }} to="/send-invite" state={params.board}>
          <InviteUserButton>Invite a user</InviteUserButton>
        </Link>
        {/* <div className="btn-container">
          <button type="button" className="btn" onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            Settings
            <FaCaretDown />
          </button>

          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}></div>
        </div> */}
      </div>

      <ListingDetails className="listingName">{listing.name} board lists:</ListingDetails>
      <Home />
    </Main>
  );
};

export default BoardLists;

const Main = styled.main`
  padding: 1rem;
`;

const ShareIconDiv = styled.div`
  cursor: pointer;
  position: fixed;
  top: 8%;
  right: 5%;
  z-index: 2;
  background-color: #ffffff;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListingDetails = styled.p`
  font-size: 1.5rem;
  font-weight: 800;
`;

const LinkCopied = styled.p`
  position: fixed;
  top: 13%;
  right: 5%;
  z-index: 2;
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
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

const DeleteButton = styled.button`
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
  border-radius: 5px;
  border: none;
  background-color: #ef233c;
  box-shadow: 0 3px 1px -2px #ccc, 0 2px 2px 0 #ccc, 0 1px 5px 0 #ccc;
  margin-left: 30px;

  &:active {
    box-shadow: 0 4px 2px -3px #ccc, 0 4px 5px 1px #ccc, 0 2px 7px 1px #ccc;
  }
`;

const InviteUserButton = styled.button`
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
  border-radius: 5px;
  border: none;
  background-color: #3a86ff;
  box-shadow: 0 3px 1px -2px #ccc, 0 2px 2px 0 #ccc, 0 1px 5px 0 #ccc;
  margin-left: 30px;

  &:active {
    box-shadow: 0 4px 2px -3px #ccc, 0 4px 5px 1px #ccc, 0 2px 7px 1px #ccc;
  }
`;
