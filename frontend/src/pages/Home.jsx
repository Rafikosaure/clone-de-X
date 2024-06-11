import React, { useContext } from "react";
import "../App.css";
import { AuthContext } from "../utils/contexts/AuthContext";

export default function Home() {
  const { user, disconnect } = useContext(AuthContext);

  return (
    <div className="App">
      {user || "not connected"}
      <button onClick={disconnect}>disconnect</button>
    </div>
  );
}
