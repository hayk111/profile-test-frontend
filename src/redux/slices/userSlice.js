import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  email: '',
  role: 'user',
  active: true,
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
      state.active = action.payload.active;
      state.avatar = action.payload.avatar;
      state.photos = action.payload.photos;
    },
    resetUser: (state, action) => {
      state.fullName = '';
      state.email = '';
      state.role = 'user';
      state.active = true;
      state.avatar = '';
      state.photos = [];
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setUser, resetUser, updateAvatar } = userSlice.actions;

export default userSlice.reducer;
