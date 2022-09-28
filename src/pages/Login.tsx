import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/users";
import { User } from "../types/users/User";
import logo from "../assets/img/logo/logo.png";

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.name === name && user.password === password
    );
    if (user?.name === name && user?.password === password) {
      dispatch(
        login({ id: user?.id, name: name, password: password, loggedIn: true })
      );
      navigate("/home");
    } else {
      console.log("No account found");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get<User[]>("/users");
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen p-5 flex flex-col justify-center items-center">
      <img src={logo} width="200" className="mb-5" />
      <h1 className="text-3xl font-bold">Login</h1>
      <form
        onSubmit={(e) => handleLogin(e)}
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
          Login
        </button>
      </form>
      <p className="mt-5">
        No account yet?
        <Link to="/register" className="font-bold ml-1">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
