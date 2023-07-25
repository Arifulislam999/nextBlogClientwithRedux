"use client";

import { DebounceInput } from "react-debounce-input";
import { useEffect, useState } from "react";
import ProfileCart from "./ProfileCart";
// import person from "../../../public/assets/p-1.jpg";
import Image from "next/image";
import {
  useGetLogInUserQuery,
  useGetLoginUserPostQuery,
} from "@/Redux/Features/Blog/blogApi";
import { useUserAlreadyLoggedInQuery } from "@/Redux/Features/Blog/authApi";
import FormData from "./FormData";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { removeSearchText } from "@/Redux/Features/Blog/blogSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const { text } = useSelector((state) => state.text);
  const { data: userStatus, isLoading } = useUserAlreadyLoggedInQuery();
  const { data: postData, isSuccess } = useGetLoginUserPostQuery();
  let isLoggedIn = userStatus?.status;
  const { data: loginUser } = useGetLogInUserQuery();
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    setSearchText(text);
  }, [text]);

  const filterBySearch = () => {
    const regex = new RegExp(searchText, "i"); // i for case insensitive search
    return postData?.allPost?.filter((item) => regex.test(item?.tag));
  };
  const filterText = filterBySearch();
  return isLoggedIn === true ? (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold py-4">Discover & Share</h2>
        <h2 className="text-3xl h-ai font-bold my-3">AI-Powered Prompts</h2>
        <div className="flex justify-center flex-wrap w-full my-3">
          <div className="">
            <Image
              src={
                loginUser?.photo ||
                "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
              }
              width={320}
              height={420}
              alt="person"
              className="border-2 border-blue-500 rounded-md basis-1/2"
            />
          </div>
          <div className="basis-1/2">
            <h2 className="text-3xl h-ai mt-12 ml-4 font-bold capitalize font-serif">
              Name:{loginUser?.name}
            </h2>
            <h2 className="text-xl  ml-4 font-bold font-mono">
              Email:{loginUser?.email}
            </h2>
            <h2 className="text-xl   ml-4 font-bold font-mono">
              Phone:{loginUser?.phone}
            </h2>
            <h2 className="text-md text-justify  max-h-52 overflow-scroll ml-4 text-gray-700 font-mono">
              Bio:{loginUser?.bio}
            </h2>
          </div>
        </div>
        <div className="relative w-full text-center">
          <DebounceInput
            minLength={3}
            debounceTimeout={500}
            type="search"
            placeholder="Search for a tag or a username"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              dispatch(removeSearchText(e.target.value));
            }}
            required
            className="font-mono bg-sky-200 text-gray-600 px-3 py-2 rounded-sm w-2/3 text-xs sm:text-lg"
          />
        </div>
      </div>
      <div>
        <h2 className="text-red-400 font-bold font-serif text-2xl mt-2">
          <span className="text-blue-400 capitalize">My </span>' Profile & it's
          activities.
        </h2>
      </div>
      <div className="flex flex-wrap justify-center">
        {isSuccess ? (
          filterText?.map((post, index) => (
            <ProfileCart key={index} post={post} />
          ))
        ) : (
          <>
            <Loader />
          </>
        )}
      </div>
    </div>
  ) : (
    <>{isLoading ? <Loader /> : <FormData />}</>
  );
};

export default Profile;
