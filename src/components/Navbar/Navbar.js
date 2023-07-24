"use client";
import Image from "next/image";
import React, { useState } from "react";
// import logo from "../../../public/assets/logo.svg";
import logoText from "../../../public/assets/logo-text.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useUserAlreadyLoggedInQuery,
  useUserLogOutQuery,
} from "@/Redux/Features/Blog/authApi";
import { useGetLogInUserQuery } from "@/Redux/Features/Blog/blogApi";

const Navbar = () => {
  const { data: loginUserData, isLoading } = useGetLogInUserQuery();
  const [logOut, setLogOut] = useState(true);
  const [userIcon, setUserIcon] = useState(true);

  const {} = useUserLogOutQuery(undefined, {
    skip: logOut,
  });
  const { data: userStatus } = useUserAlreadyLoggedInQuery();
  let isLoggedIn = userStatus;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handlerUser = () => {
    setShow((prev) => !prev);
    // setTimeout(() => {
    //   setShow(false);
    // }, 4000);
  };

  return (
    <div className="flex justify-between mt-2">
      <div>
        <Link href={"/"}>
          <Image
            className="cursor-pointer"
            src={logoText}
            width={110}
            height={110}
            priority
            alt="logo"
          />
        </Link>
      </div>

      <div className="flex">
        {isLoggedIn && userIcon === true ? (
          <>
            <div className="mr-3 mt-2">
              <Link href={"/upload-post"}>
                <button
                  type="button"
                  className="border-2 border-red-600 rounded-lg px-3 py-1 text-red-400 cursor-pointer hover:bg-red-600 hover:text-red-200"
                >
                  Create Post
                </button>
              </Link>
            </div>

            <div className="relative">
              {!isLoading ? (
                <Image
                  onClick={handlerUser}
                  src={
                    loginUserData?.photo ||
                    "https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png"
                  }
                  alt="user"
                  width={45}
                  height={45}
                  className="rounded-full border-2 border-green-500 cursor-pointer"
                />
              ) : (
                <Image
                  onClick={handlerUser}
                  src={
                    "https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png"
                  }
                  alt="user"
                  width={45}
                  height={45}
                  className="rounded-full border-2 border-green-500 cursor-pointer"
                />
              )}
              {show && (
                <div className="flex flex-col absolute w-28 mt-1 h-20 bg-gray-400 border-2 border-sky-400 rounded-md">
                  <div>
                    <p
                      onClick={() => {
                        setShow(false), router.push("/profile");
                      }}
                      className="cursor-pointer ml-2 font-serif hover:text-white hover:font-bold delay-100 transition-all"
                    >
                      Profile
                    </p>
                  </div>
                  <p
                    onClick={() => {
                      setShow(false), router.push("/editprofile");
                    }}
                    className="cursor-pointer ml-2 font-serif hover:text-white hover:font-bold delay-100 transition-all"
                  >
                    Edit Profile
                  </p>
                  <p
                    onClick={() => {
                      setShow(false),
                        router.push("/login"),
                        setLogOut(false),
                        setUserIcon(false);
                    }}
                    className="cursor-pointer ml-2 font-serif hover:text-white hover:font-bold delay-100 transition-all"
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div>
            <Link href={"/login"}>
              <button
                type="button"
                className="border-2 border-blue-600 rounded-lg px-3 py-1 text-blue-400 cursor-pointer hover:bg-blue-600 hover:text-blue-200"
              >
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
