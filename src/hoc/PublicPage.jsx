import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { values } from '../values';

function PublicPage({ children }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem(values.storageKeys.accessToken);
    if (!accessToken) {
      return;
    }

    if ((user && user.email) || accessToken) {
      navigate('/profile');
    }
  }, [user, navigate]);

  return <>{children}</>;
}

PropTypes.PublicPage = {
  children: PropTypes.node,
};

export default PublicPage;
