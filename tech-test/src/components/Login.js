import React, { useEffect, useState } from "react";
import sideImage from "../assets/images/login.svg";
import logo from "../assets/images/Vector.svg";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fetchedData, setFetchedData] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [title, setTitle] = useState("");
  //   const readData = async () => {
  //     // reading data
  //     console.log("read data");

  //   };

  const storeData = async (e) => {
    e.preventDefault();
    if (email === "" && password === "") {
      setShowAlert(true);
      setTitle("All fields must be filled");
      return;
    }
    console.log(email);
    // readData();
    let a = undefined;
    const q = query(collection(db, "users"), where("email", "==", email));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setFetchedData(doc.id);
        a = doc.id;
      });
    } catch (error) {
      console.log(error);
    }
    console.log("a : ", a);
    // console.log(fetchedData);

    if (a === undefined) {
      console.log("new User");
      // adding data
      try {
        const docRef = await addDoc(collection(db, "users"), {
          email: email,
          pass: password,
        });
        localStorage.setItem("user", email);
        console.log("data added");
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("user already Exist");
      setShowAlert(true);
      setTitle("An acoount with this email already exist");
    }
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    const user = localStorage.getItem("user");
    console.log("user : ", user);
    if (user !== null || user !== "") {
      navigate("/");
    }
  }, [showAlert]);

  return showAlert ? (
    <Alert title={title} />
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center mt-5 sm:mt-0 h-screen">
      <div className="h-1/2 flex justify-center items-center mb-6 sm:mb-0">
        <form onSubmit={storeData}>
          <div className="flex justify-center items-center">
            <img src={logo} className="mr-4 logo w-10 sm:w-20" />
            <h2 className="text-lg	sm:text-4xl	">
              <span style={{ color: "#3968FA" }}>career</span> network
              <span style={{ color: "#3968FA" }}>.co</span>
              <sup className="text-lg mb-1">TM</sup>
            </h2>
          </div>
          <div className="mt-9 flex flex-col justify-center items-center">
            <input
              type="email"
              placeholder="Email"
              className="loginInputs p-2 rounded-lg w-3/4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInputs p-2 mt-3 rounded-lg w-3/4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="mt-10 loginBtn p-2 rounded-full px-7"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div>
        <img src={sideImage} className="" />
      </div>
    </div>
  );
};
