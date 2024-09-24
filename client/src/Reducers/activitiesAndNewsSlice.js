
import { createSlice } from '@reduxjs/toolkit';

const  activitiesAndNewsSlice = createSlice({
  name: 'activitiesAndNews',
  initialState: {
    activities: [], // Store all activities as an array of objects
    news:[]
  },
  reducers: {
    addActivity: (state, action) => {
      state.activities.push({
        title: action.payload.title,
        description: action.payload.description,
        date: action.payload.date,
        images: action.payload.images, // base64 encoded images
        videos: action.payload.videos, // base64 encoded videos
      });
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

export const { addActivity,removeActivity,updateActivity,addNews,removeNews,updateNews } =  activitiesAndNewsSlice.actions;
export default activitiesAndNewsSlice.reducer;
