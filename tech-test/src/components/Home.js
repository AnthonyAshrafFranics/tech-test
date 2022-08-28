import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/Vector.svg";
import { Alert } from "./Alert";

export const Home = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    setEmail(user);
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center items-center mb-9">
        <img src={logo} className="logo mr-4 w-10 sm:w-20" alt="" />
        <h2 className="text-lg	sm:text-4xl">
          <span style={{ color: "#3968FA" }}>career</span> network
          <span style={{ color: "#3968FA" }}>.co</span>
          <sup className="text-lg mb-1">TM</sup>
        </h2>
      </div>
      <div className="text-3xl flex flex-col justify-center items-center mb-9">
        Hello,
        <div>{email}</div>
      </div>
      <button
        type="submit"
        onClick={logout}
        className="mt-10 loginBtn p-2 rounded-full px-10"
      >
        Log Out
      </button>
    </div>
  );
};
