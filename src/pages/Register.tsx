import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/users";
import { User } from "../types/users/User";

export interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [existingUsers, setExistingUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = existingUsers.find((user) => user.name === name);
    if (user?.name === name) {
      console.log("A user with that name already exists.");
    } else {
      let newUserId = 1;
      for (let i = 0; i < existingUsers.length; i++) {
        newUserId++;
      }
      createNewUser(newUserId);
      navigate("/login");
    }
  };

  const createNewUser = async (id: number) => {
    try {
      const response = await api.post<User[]>("/users", {
        id: id,
        name: name,
        password: password,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get<User[]>("/users");
      setExistingUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen p-5 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Sign up</h1>
      <form
        onSubmit={(e) => handleSignUp(e)}
        className="flex flex-col justify-center items-center"
      >
        <input
          type="name"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-5 p-2 border-solid border-2 border-black rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-5 p-2 border-solid border-2 border-black rounded-md"
        />
        <br />
        <button
          type="submit"
          className="font-bold px-12 py-4 bg-black rounded-md text-white"
        >
          Sign up
        </button>
      </form>
      <p className="mt-5">
        Already have an account?
        <Link to="/login" className="font-bold ml-1">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;

// TODO:
// Add sign up for account
