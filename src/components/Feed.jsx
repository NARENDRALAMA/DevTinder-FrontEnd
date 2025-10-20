import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const getFeed = async () => {
    // Only skip if feed already has data
    if (feed && feed.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data.users));
    } catch (err) {
      console.error("Feed error:", err);
      console.error("Error response:", err.response?.data);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return;
  }

  if (feed.length === 0) {
    return <div className="flex justify-center my-10">No users found</div>;
  }

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
