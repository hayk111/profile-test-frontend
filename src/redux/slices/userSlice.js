import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  role: 'user',
  avatar: '',
  photos: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.avatar = action.payload.avatar;
      state.photos = action.payload.photos;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
