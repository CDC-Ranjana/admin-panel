
import { createSlice } from '@reduxjs/toolkit';

const  adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admins : [],
    activities: [], // Store all activities as an array of objects
    news:[]
  },
  reducers: {
    addAdmin:(state,action)=>{
      state.admins.push({
        username:action.payload.username,
        email:action.payload.email,
        phone:action.payload.phone
      })
    },
    addActivity: (state, action) => {
      state.activities.push({
        title: action.payload.title,
        description: action.payload.description,
        date: action.payload.date,
        images: action.payload.images, // base64 encoded images
        videos: action.payload.videos, // base64 encoded videos
      });
    },
    removeAdmin: (state,action) =>{
      state.admins = state.admins.filter((_, index) => index !== action.payload);
    },
    removeActivity: (state, action) => {
      state.activities = state.activities.filter((_, index) => index !== action.payload);
    },
    updateActivity: (state, action) => {
      const { index, activity } = action.payload;
      state.activities[index] = activity;
    },
    addNews: (state, action) => {
      state.news.push({
        title: action.payload.title,
        description: action.payload.description,
        date: action.payload.date,
        images: action.payload.images, // base64 encoded images
        videos: action.payload.videos, // base64 encoded videos
      });
    },
    removeNews: (state, action) => {
      state.news = state.news.filter((_, index) => index !== action.payload);
    },
    updateNews: (state, action) => {
      const { index, newS } = action.payload;
      state.news[index] = newS;
    },
  },
});

export const {addAdmin,removeAdmin, addActivity,removeActivity,updateActivity,addNews,removeNews,updateNews } =  adminSlice.actions;
export default adminSlice.reducer;
