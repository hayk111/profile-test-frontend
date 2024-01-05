import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { values } from '../values';
import { setUser } from '../redux/slices/userSlice';
import { usersMeRequest } from '../api';

function PrivatePage({ children }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem(values.storageKeys.accessToken);

    if (!accessToken) {
      navigate('/login');
      return;
    }

    if (user && user.email) {
      return;
    }

    const fetchUser = async () => {
      const resultUser = await usersMeRequest(accessToken);
      dispatch(setUser(resultUser));
    };

    fetchUser();
  }, [user, navigate, dispatch]);

  return <>{children}</>;
}

PrivatePage.propTypes = {
  children: PropTypes.node,
};

export default PrivatePage;
