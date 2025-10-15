import React, { use, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const Requests = () => {
  const dispatch = useDispatch();

  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
      console.log(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return;
  }

  if (requests.length === 0) {
    return (
      <h1 className="text-bold text-2xl text-center my-10">
        No Requests Found
      </h1>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Requests </h1>

      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={request._id}
            className=" flex justify-between items-center  m-4 p-4 border rounded-lg  bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              ></img>
            </div>

            <div className="text-left mx-4">
              <h2 className="font-bold">{firstName + " " + lastName}</h2>

              <p>{age + " " + gender}</p>

              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary m-2">Reject</button>
              <button className="btn btn-secondary m-2">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
