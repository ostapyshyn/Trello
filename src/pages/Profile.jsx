import React, { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { removeUser } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [changeDetails, setChangeDetails] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    dispatch(removeUser());
    navigate('/about');
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Could not update profile details');
    }
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <PageHeaderParagraph>My profile</PageHeaderParagraph>
        <LogOutButton type="button" onClick={onLogout}>
          Logout
        </LogOutButton>
      </header>

      <main>
        <ProfileHeader>
          <ProfileDetailsTextP>Details</ProfileDetailsTextP>
          <ChangePersonalDetailsP
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </ChangePersonalDetailsP>
        </ProfileHeader>

        <ProfileCard>
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type="text"
              id="email"
              className={'profileEmail'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </ProfileCard>
      </main>
    </div>
  );
};

const ChangePersonalDetailsP = styled.p`
  cursor: pointer;
  font-weight: 600;
  color: #00cc66;
`;

const ProfileDetailsTextP = styled.p`
  font-weight: 600;
`;

const PageHeaderParagraph = styled.p`
  font-size: 2rem;
  font-weight: 800;
`;

const ProfileCard = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 3px 0px 11px 0px rgba(0, 0, 0, 0.2);
  max-width: 500px;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 500px;
`;

const LogOutButton = styled.div`
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background-color: #00cc66;
  padding: 1rem 0.75rem;
  border-radius: 1rem;
`;

export default Profile;
