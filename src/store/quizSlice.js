import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuizzes = createAsyncThunk(
  "quiz/fetchQuizzes",
  async (token) => {
    if (token) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_ROUTE}/quiz`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw Error(error?.response?.data.message || error.message);
      }
    } else {
      throw Error("No Token found");
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizzes: null,
    liveQuizzes: [],
    attemptedQuizzes: [],
    status: "idle",
    error: "",
  },
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.quizzes = action.payload;
        state.error = null;
        state.status = "loaded";
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "loaded";
      })
      .addCase(fetchQuizzes.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      });
  },
});

export const quizActions = { ...quizSlice.actions, fetchQuizzes };
export default quizSlice;
