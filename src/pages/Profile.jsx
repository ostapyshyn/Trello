import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    setUser(auth.currentUser);
    console.log(auth.currentUser);
    console.log('test');
  }, []);

  return user ? <h1>Hello, {user.displayName}!</h1> : 'Not Logged In!';
};

export default Profile;
