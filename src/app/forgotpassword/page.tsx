"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Forgotpassword() {
  const [token, setToken] = useState("");
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [change, setChange] = useState(false);
  const sendmail = async () => {
    console.log(email);
    const res = await axios.post("api/users/forgotpassword", { email });
    console.log(res);
  };

  const changepassword = async () => {
    console.log(password);
    const res = await axios.post("api/users/newpassword", { password, token });
    console.log(res);
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
    if (urlToken?.length > 0) {
      setChange(true);
    }
  }, []);
  return (
    <>
      {!change ? (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <label htmlFor="email">email</label>
          <input
            className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />

          <button onClick={sendmail} className="p-2 border border-">
            Send mail
          </button>
        </div>
      ) : (
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
      )}
    </>
  );
}
