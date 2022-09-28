import { Excercise } from "./Excercise";

export interface Course {
  id: number;
  type: string;
  language: string;
  status: string;
  description: string;
  excercises: Excercise[];
}
