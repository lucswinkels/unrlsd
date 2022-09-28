import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

export interface AccountPageProps {}

const AccountPage: React.FC<AccountPageProps> = (props) => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-5">
      <p>Hey, {user?.name}</p>
      <button onClick={(e) => handleLogout(e)}>Logout</button>
    </div>
  );
};

export default AccountPage;

// TODO:
// Edit password
// Delete account
