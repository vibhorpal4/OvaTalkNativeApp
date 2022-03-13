import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  timelinePosts: null,
  allPosts: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getTimelinePosts: (state, action) => {
      state.timelinePosts = action.payload;
    },
    removeTimelinePosts: state => {
      state.timelinePosts = null;
    },
    getAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    removeAllPosts: state => {
      state.allPosts = null;
    },
  },
});

export const {
  getAllPosts,
  getTimelinePosts,
  removeAllPosts,
  removeTimelinePosts,
} = postSlice.actions;

export default postSlice.reducer;
