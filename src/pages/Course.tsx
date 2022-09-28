import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Excercise } from "../types/courses/Excercise";
import { Course } from "../types/courses/Course";
import api from "../api/courses";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

export interface CoursePageProps {}

const CoursePage: React.FC<CoursePageProps> = (props) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get<Course[]>("/courses");
        setCourses(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourses();
  }, []);

  const { id } = useParams();
  const courseId = Number(id);

  const course = courses.find((course) => course.id === courseId);
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen p-5">
      <HiOutlineArrowNarrowLeft onClick={handleNavigateBack} />
      <h5 className="text-3xl font-bold">
        Course {course?.id} - {course?.language} {course?.type}
      </h5>
      {course?.excercises.map((Excercise: Excercise) => {
        return <div key={Excercise.id}>{Excercise.description}</div>;
      })}
    </div>
  );
};

export default CoursePage;
