"use client";
import { useUserLogInMutation } from "@/Redux/Features/Blog/authApi";
import { logOutTrueFalse } from "@/Redux/Features/Blog/blogSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FormData = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userLogIn, { status, error }] = useUserLogInMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlerSubmit = (e) => {
    e.preventDefault();

    try {
      userLogIn({ data: { email, password } });
    } catch (error) {
      console.log("User Login failed.");
    }
  };
  useEffect(() => {
    if (status === "fulfilled") {
      router.push("/");
    }
  }, [status, error]);

  return (
    <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-xl font-semibold">
                Login Form with Blog Application Project
              </h1>
            </div>
            <form onSubmit={handlerSubmit}>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="on"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="on"
                      required
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => {
                        dispatch(logOutTrueFalse(true));
                      }}
                      type="submit"
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
              {status === "rejected" && (
                <div className="text-center">
                  <span className="text-xl text-white px-3 py-1 rounded-md bg-red-400">
                    {error?.data?.message}
                  </span>
                </div>
              )}
            </form>
            <p className="text-center font-serif text-lg">
              Blog Application{" "}
              <Link href={"/create-account"}>
                {" "}
                <span className="text-green-600 underline cursor-pointer">
                  Create an Account
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormData;
