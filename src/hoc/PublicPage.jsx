import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function PublicPage({ children }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      navigate('/profile');
    }
  }, [user, navigate]);

  return <>{children}</>;
}
