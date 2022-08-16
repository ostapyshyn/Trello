import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../lib/init-firebase';
import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';
import styled from 'styled-components';

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
      <ListingDetails className="listingName">{listing.name} board lists:</ListingDetails>
    </Main>
  );
};

export default BoardLists;

const Main = styled.main`
  padding: 1rem;
`;

const ListingDetails = styled.p`
  font-size: 1.5rem;
  font-weight: 800;
`;
