import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  user: null,
  message: null,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfile: (state, action) => {
      (state.user = action.payload.user),
        (state.message = action.payload.message),
        (state.error = action.payload.error);
    },
  },
});

export const {getProfile} = profileSlice.actions;

export default profileSlice.reducer;
