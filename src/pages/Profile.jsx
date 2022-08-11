import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
    </div>
  );
};

export default Profile;
