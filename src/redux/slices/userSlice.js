import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
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
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.avatar = action.payload.avatar;
      state.photos = action.payload.photos;
    },
    resetUser: (state, action) => {
      state.fullName = '';
      state.email = '';
      state.role = 'user';
      state.avatar = '';
      state.photos = [];
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
