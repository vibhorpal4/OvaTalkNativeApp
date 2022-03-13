import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginState: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logoutState: state => {
      state.token = null;
      state.user = null;
    },
  },
});

export const {loginState, logoutState} = authSlice.actions;

export default authSlice.reducer;
