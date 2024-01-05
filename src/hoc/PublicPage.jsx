import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PublicPage({ children }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      navigate('/profile');
    }
  }, [user, navigate]);

  return <>{children}</>;
}

PropTypes.PublicPage = {
  children: PropTypes.node,
};

export default PublicPage;
