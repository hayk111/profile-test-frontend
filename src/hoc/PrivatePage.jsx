import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { values } from '../values';
import { setUser } from '../redux/slices/userSlice';

export default function PrivatePage({ children }) {
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
      const resultUser = await fetch(
        `${process.env.REACT_APP_API_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ).then((response) => response.json());

      dispatch(setUser(resultUser));
    };

    fetchUser();
  }, [user, navigate, dispatch]);

  return <>{children}</>;
}
