import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveCourseState {
  value: string[];
}

const initialState: ActiveCourseState = {
  value: [],
};

export const activeCoursesSlice = createSlice({
  name: "activeCourses",
  initialState,
  reducers: {
    addActiveCourse: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
    removeActiveCourse: (state, action: PayloadAction<number>) => {
      state.value.splice(action.payload, 1);
    },
  },
});

export const { addActiveCourse, removeActiveCourse } =
  activeCoursesSlice.actions;

export default activeCoursesSlice.reducer;
