"use client";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const getUserData = async () => {
    const res = await axios.get("api/users/me");
    console.log(res.data);
    console.log(res.data.data._id);
    setData(res.data.data._id);
  };

  const logout = async () => {
    try {
      const res = await axios.get("api/users/logout");
      console.log(res);
      toast.success("logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <p>Profile Page</p>
      <h2 className="p-3 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
      >
        Logout
      </button>
      <button
        onClick={getUserData}
        className="bg-purple-500 mt-4 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded"
      >
        get details
      </button>
    </div>
  );
}
