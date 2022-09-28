import React from "react";
import { useNavigate } from "react-router-dom";
import { Course } from "../types/courses/Course";

const CourseCard: React.FC<Course> = (props) => {
  const courseId = props.id;
  const navigate = useNavigate();

  const handleNavigateToCourse = () => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div
      className="bg-white shadow-lg shadow-black-500/50 mr-4 justify-center items-center p-5"
      onClick={handleNavigateToCourse}
    >
      {props.language} - {props.type}
    </div>
  );
};

export default CourseCard;
