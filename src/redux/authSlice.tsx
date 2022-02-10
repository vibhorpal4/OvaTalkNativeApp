import {createSlice} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {useLogoutQuery} from './services/authService';

interface auth {
  token: string | null;
  user: any;
}

const initialState: auth = {
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
