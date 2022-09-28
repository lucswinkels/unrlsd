import { configureStore } from "@reduxjs/toolkit";
import activeCoursesReducer from "../features/activeCourseSlice";
import userReducer from "../features/userSlice";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import localStorage from "redux-persist/es/storage";

const reducers = combineReducers({
  activeCourses: activeCoursesReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
