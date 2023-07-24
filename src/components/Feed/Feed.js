"use client";
import { DebounceInput } from "react-debounce-input";
import PostCart from "./PostCart";
import { useState } from "react";
import { useGetAllPostQuery } from "@/Redux/Features/Blog/blogApi";
import Loader from "../Loader/Loader";

const Feed = () => {
  const { data: postData, isSuccess } = useGetAllPostQuery();
  const [searchText, setSearchText] = useState("");

  return (
    <div>
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
      <div className="mt-5 flex justify-center flex-wrap">
        {isSuccess ? (
          postData?.allPost?.map((post, index) => (
            <PostCart post={post} key={index} />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Feed;
