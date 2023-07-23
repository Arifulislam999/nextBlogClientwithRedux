"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import logo from "../../../public/assets/logo.svg";
import logoText from "../../../public/assets/logo-text.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserAlreadyLoggedInQuery } from "@/Redux/Features/Blog/authApi";

const Navbar = () => {
  const {
    data: userStatus,
    isLoading,
    isSuccess,
  } = useUserAlreadyLoggedInQuery();
  const isLoggedIn = false;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handlerUser = () => {
    setShow((prev) => !prev);
    setTimeout(() => {
      setShow(false);
    }, 4000);
  };

  useEffect(() => {
    console.log(userStatus);
  }, [isSuccess, isLoading]);

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

        {isLoggedIn === true ? (
          <div className="relative">
            <Image
              onClick={handlerUser}
              src="https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png"
              alt="user"
              width={45}
              height={45}
              className="rounded-full border-2 border-green-500 cursor-pointer"
            />
            {show && (
              <div className="flex flex-col absolute w-28 mt-1 h-20 bg-gray-300 brder-2 border-sky-400 rounded-md">
                <div>
                  <p
                    onClick={() => {
                      setShow(false), router.push("/profile");
                    }}
                    className="cursor-pointer ml-2 font-serif hover:text-green-500 hover:font-bold delay-100 transition-all"
                  >
                    Profile
                  </p>
                </div>
                <p
                  onClick={() => {
                    setShow(false), router.push("/editprofile");
                  }}
                  className="cursor-pointer ml-2 font-serif hover:text-green-500 hover:font-bold delay-100 transition-all"
                >
                  Edit Profile
                </p>
                <p
                  onClick={() => {
                    setShow(false), router.push("/");
                  }}
                  className="cursor-pointer ml-2 font-serif hover:text-green-500 hover:font-bold delay-100 transition-all"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
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
