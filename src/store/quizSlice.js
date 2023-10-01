import { createSlice } from "@reduxjs/toolkit";
const quizSlice = createSlice({
  name: "quiz",
  initialState: { quizzes: null, liveQuizzes: [], attemptedQuizzes: [] },
  reducers: {
    setQuiz: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = [...state.quizzes, action.payload];
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter((s) => action.payload !== s._id);
    },
    updateQuiz: (state, action) => {
      state.quizzes.forEach((quiz) => {
        if (quiz._id === action.payload._id) {
          quiz.results = action.payload.results;
        }
      });
    },

    addLive: (state, action) => {
      const quizId = action.payload._id;
      if (!state.liveQuizzes.some((quiz) => quiz._id === quizId)) {
        state.liveQuizzes.push(action.payload);
      }
    },
    addAttempted: (state, action) => {
      const quizId = action.payload._id;
      if (!state.attemptedQuizzes.some((quiz) => quiz._id === quizId)) {
        state.attemptedQuizzes.push(action.payload);
      }
    },
    removeLive: (state, action) => {
      state.liveQuizzes = state.liveQuizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },
  },
});

export const quizActions = quizSlice.actions;
export default quizSlice;
