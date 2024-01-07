import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'user',
  active: true,
  isFirstRegisterPartComplete: false,
};

export const registerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFirstRegisterPart: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.role = action.payload.role;
      state.active = action.payload.active;
      state.isFirstRegisterPartComplete =
        action.payload.isFirstRegisterPartComplete;
    },
  },
});

export const { setFirstRegisterPart, setSecondRegisterPart } =
  registerSlice.actions;

export default registerSlice.reducer;
