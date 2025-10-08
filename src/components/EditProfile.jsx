import React from "react";
import { useState } from "react";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [emailId, setEmailId] = useState(user.emailId);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                value={firstName}
                className="input"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                value={lastName}
                className="input"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Photo Url</legend>
              <input
                type="text"
                value={photoUrl}
                className="input"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                value={age}
                className="input"
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                value={gender}
                className="input"
                onChange={(e) => setGender(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                value={about}
                className="input"
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500"></p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary ">Save Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
