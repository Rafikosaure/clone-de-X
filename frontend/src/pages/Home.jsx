import { io } from "socket.io-client";
import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import "../styles/Home.css";
import { AuthContext } from "../utils/contexts/AuthContext";
import axios from "axios";
import { API_URL } from "../utils/constants/backend";

export default function Home() {
  const socket = io("http://localhost:8080");

  const { user, disconnect } = useContext(AuthContext);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/tweet`);
        setTweets(data);
        console.log(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tweets :", error);
      }
    };
    fetchTweet();

    socket.on("newTweet", (newTweet) => {
      setTweets((prevTweets) => [...prevTweets, newTweet]);
    });

    socket.on("deleteTweet", (deleteTweet) => {
      setTweets((prevTweets) =>
        prevTweets.filter((tweet) => tweet._id !== deleteTweet._id)
      );
    });

    return () => {
      socket.off("newTweet");
      socket.off("deleteTweet");
    };
  }, []);

  return (
    <div className="App">
      {user || "not connected"}
      <button onClick={disconnect}>disconnect</button>

      <div className="Tweets">
        {tweets.map((tweet) => (
          <div key={tweet._id} className="Tweet">
            <div>id: {tweet._id}</div>
            <div>User: {tweet.user.pseudonym}</div>
            {tweet.parentTweet && (
              <div>{`retweet of ${tweet.parentTweet._id}`}</div>
            )}
            {tweet.originTweet && (
              <div>{`response of ${tweet.originTweet}`}</div>
            )}
            <div>Content: {tweet.content}</div>
            <div>Likes: {tweet.likes.length}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
