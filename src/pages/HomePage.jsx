import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import trelloBoard from '../assets/svg/trelloBoard.svg';
import styled from 'styled-components';
import { db } from '../lib/init-firebase';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { collection, getDocs, query, where } from 'firebase/firestore';
import BoardItem from '../components/BoardItem';

const HomePage = () => {
  const [boards, setBoards] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const uid = useSelector((state) => state.user.id);
  const email = useSelector((state) => state.user.email);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const boardsRef = collection(db, 'boards');
        const q = query(boardsRef);
        const querySnap = await getDocs(q);

        const boards = [];

        querySnap.forEach((doc) => {
          return boards.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setBoards(boards);
        setLoading(false);
      } catch (error) {
        navigate('/sign-in');
        toast.error('Please log in!');
      }
    };

    fetchBoards();
  }, [navigate, uid]);

  return (
    <Wrapper>
      <Link to="/create-board">
        <CreateBoard>
          <img src={trelloBoard} alt="home" />
          <p>Create board</p>
          <img src={arrowRight} alt="arrow right" />
        </CreateBoard>
      </Link>

      {loading ? (
        <Spinner />
      ) : boards && boards.length > 0 ? (
        <>
          <main>
            <ListofBoards>
              {console.log(boards)}
              {boards
                .filter((item) => item.data.users.includes(email))
                .map((board) => (
                  <BoardItem boardData={board.data} id={board.id} key={board.id} />
                ))}
            </ListofBoards>
          </main>
        </>
      ) : (
        <ProfileCard>
          <p>There are no boards yet!</p>
        </ProfileCard>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
`;

const ListofBoards = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
`;

const CreateBoard = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  max-width: 500px;
  justify-content: space-between;
  align-items: center;
  border-radius: 1rem;
  padding: 0.25rem 1rem;
  font-weight: 600;
`;

const ProfileCard = styled.div`
  text-align: center;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 3px 0px 11px 0px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin-top: 4rem;
  font-weight: 500;
`;

export default HomePage;
