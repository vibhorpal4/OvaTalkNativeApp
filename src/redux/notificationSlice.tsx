import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isRead: true,
};

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState,
  reducers: {
    setIsRead: (state, action) => {
      state.isRead = action.payload;
    },
  },
});

export const {setIsRead} = notificationSlice.actions;

export default notificationSlice.reducer;
