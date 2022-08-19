import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../lib/init-firebase';
import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';
import styled from 'styled-components';
import Home from './Home/Home';

const BoardLists = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

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
        }}
      >
        <img src={shareIcon} alt="shareIcon" />
      </ShareIconDiv>

      {shareLinkCopied && <LinkCopied>Link Copied!</LinkCopied>}
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
