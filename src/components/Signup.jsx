import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const signup = async () => {
        const res = await axios.post(
          BASE_URL + "/signup",
          {
            emailId,
            password,
            firstName,
            lastName,
          },
          { withCredentials: true }
        );
      };
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Signup</h2>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                value={emailId}
                className="input"
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Type here"
              />
            </fieldset>

            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                value={password}
                className="input"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type here"
              />
            </fieldset>

            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">FirstName</legend>
              <input
                type="text"
                value={firstName}
                className="input"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Type here"
              />
            </fieldset>

            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">LastName</legend>
              <input
                type="text"
                value={lastName}
                className="input"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Type here"
              />
            </fieldset>

            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Age</legend>
              <input
                type=""
                value={age}
                className="input"
                onChange={(e) => setAge(e.target.value)}
                placeholder="Type here"
              />
            </fieldset>

            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                value={gender}
                className="input"
                onChange={(e) => setGender(e.target.value)}
                placeholder="Type here"
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary " onClick={handleSignup}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
