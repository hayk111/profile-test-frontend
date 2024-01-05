export const loginRequest = async ({ email, password }) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((response) => response.json());
};

export const registerRequest = async (data) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};

export const usersMeRequest = async (accessToken) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => response.json());
};

export const uploadAvatarRequest = async (accessToken, avatar) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ avatar }),
  }).then((response) => response.text());
};
