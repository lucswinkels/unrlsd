import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { selectUser } from "./features/userSlice";
import AccountPage from "./pages/Account";
import CoursePage from "./pages/Course";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

export interface ApplicationProps {}

const App: React.FC<ApplicationProps> = (props) => {
  const user = useSelector(selectUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={user?.loggedIn ? <Navigate to="/home" /> : <RegisterPage />}
        />
        <Route
          path="/login"
          element={user?.loggedIn ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/home"
          element={user?.loggedIn ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/course">
          <Route
            index
            element={user?.loggedIn ? <CoursePage /> : <Navigate to="/login" />}
          />
          <Route
            path=":id"
            element={user?.loggedIn ? <CoursePage /> : <Navigate to="/login" />}
          />
        </Route>
        <Route
          path="/account"
          element={user?.loggedIn ? <AccountPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// TODO:
// Add basic course info
// -- Speaking course
// -- Translation course
// Add styling
// -- Setup tailwind base variables and reusable components
// -- Mobile only for now
// Remove create-react-app boilerplate / update public stuff, readme, icons, etc.
// Add desktop styling support
