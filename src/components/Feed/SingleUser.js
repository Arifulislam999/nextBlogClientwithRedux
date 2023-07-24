"use client";
import React, { useState } from "react";
// import person from "../../../public/assets/p-1.jpg";
import { DebounceInput } from "react-debounce-input";
import Image from "next/image";
import SingleUserProfileCart from "./SingleUserProfileCart";
import { useSearchParams } from "next/navigation";
import { useGetAnotherSingleUserQuery } from "@/Redux/Features/Blog/blogApi";
import Loader from "../Loader/Loader";
const SingleUser = () => {
  const searchParams = useSearchParams();
  const paramsId = searchParams.get("id");
  const { data: singleUserPost, isSuccess } = useGetAnotherSingleUserQuery({
    id: paramsId,
  });
  const [searchText, setSearchText] = useState("");
  const { name, email, phone, photo, bio } =
    singleUserPost?.singleUser[0].creatorId || {};
  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold py-4">Discover & Share</h2>
        <h2 className="text-3xl h-ai font-bold my-3">AI-Powered Prompts</h2>
        <div className="flex justify-center flex-wrap w-full my-3">
          <div className="">
            <Image
              src={
                photo ||
                "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
              }
              width={320}
              height={420}
              alt="person"
              className="border-2 border-blue-500 rounded-md"
            />
          </div>
          <div>
            <h2 className="text-3xl h-ai mt-12 ml-4 font-bold capitalize font-serif">
              Name:{name}
            </h2>
            <h2 className="text-xl  ml-4 font-bold font-mono">Email:{email}</h2>
            <h2 className="text-xl   ml-4 font-bold font-mono">
              Phone:{phone}
            </h2>
            <h2 className="text-md text-justify   ml-4 text-gray-700 font-mono">
              Bio:{bio}
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
            onChange={(e) => setSearchText(e.target.value)}
            required
            className="font-mono bg-sky-200 text-gray-600 px-3 py-2 rounded-sm w-2/3 text-xs sm:text-lg"
          />
        </div>
      </div>
      <div>
        <h2 className="text-red-400 font-bold font-serif text-2xl mt-2">
          <span className="text-blue-400 capitalize">{name} </span>'s Posts...
        </h2>
      </div>
      <div className="flex flex-wrap justify-center">
        {isSuccess ? (
          singleUserPost?.singleUser?.map((post, index) => (
            <SingleUserProfileCart key={index} post={post} />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default SingleUser;
