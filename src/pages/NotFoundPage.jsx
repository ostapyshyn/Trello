import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      Sorry! This page doesn't exist. Go <Link to="/">Home Page!</Link>
    </div>
  );
};

export default NotFoundPage;
