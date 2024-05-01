"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Newpassword() {
  const [password, setpassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  const changepassword = async () => {
    console.log(password);
    const res = await axios.post("api/users/newpassword", { password, token });
    console.log(res);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label htmlFor="password">enter new password</label>
      <input
        className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="text"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder="password"
      />

      <button onClick={changepassword} className="p-2 border border-">
        new password
      </button>
    </div>
  );
}
