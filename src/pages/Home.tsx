import React, { useEffect, useState } from "react";
import { RootState } from "../app/store";
import CourseCard from "../components/CourseCard";
import { addActiveCourse } from "../features/activeCourseSlice";
import { useSelector, useDispatch } from "react-redux";
import { Course } from "../types/courses/Course";
import api from "../api/courses";
import { selectUser } from "../features/userSlice";
import { Link } from "react-router-dom";

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = (props) => {
  const [courses, setCourses] = useState<Course[]>([]);

  const user = useSelector(selectUser);

  // const [activeCourseNameInput, setActiveCourseNameInput] = useState("");

  // const activeCourses = useSelector(
  //   (state: RootState) => state.activeCourses.value
  // );

  // const dispatch = useDispatch();

  // const handleAddActiveCourses = () => {
  //   if (!activeCourseNameInput) return;
  //   dispatch(addActiveCourse(activeCourseNameInput));
  //   setActiveCourseNameInput("");
  // };

  const fetchCourses = async () => {
    try {
      const response = await api.get<Course[]>("/courses");
      setCourses(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen p-5">
      <p>Welcome, {user?.name}</p>
      <Link to="/account">Account settings</Link>
      {/* <h5 className="text-3xl font-bold">Active Courses</h5>
      <div className="flex">
        {activeCourses.map((name, index) => {
          return <CourseCard name={name} index={index} key={index} />;
        })}
      </div>
      <input
        value={activeCourseNameInput}
        onChange={(e) => setActiveCourseNameInput(e.target.value)}
      />
      <button onClick={handleAddActiveCourses}>Add active course</button> */}
      <h5 className="text-3xl font-bold">All Courses</h5>
      <div className="flex">
        {courses.map((Course: Course) => {
          return (
            <CourseCard
              key={Course.id}
              id={Course.id}
              type={Course.type}
              language={Course.language}
              status={Course.status}
              description={Course.description}
              excercises={Course.excercises}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
