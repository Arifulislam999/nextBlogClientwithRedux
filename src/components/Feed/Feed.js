"use client";
import { DebounceInput } from "react-debounce-input";
import PostCart from "./PostCart";
import { useEffect, useState } from "react";
import { useGetAllPostQuery } from "@/Redux/Features/Blog/blogApi";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { removeSearchText } from "@/Redux/Features/Blog/blogSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const { text } = useSelector((state) => state.text);
  const { data: postData, isSuccess } = useGetAllPostQuery();
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    setSearchText(text);
  }, [text]);
  const filterBySearch = () => {
    const regex = new RegExp(searchText, "i"); // i for case insensitive search
    return postData?.allPost?.filter(
      (item) => regex.test(item?.tag) || regex.test(item?.creatorId?.name)
    );
  };

  const filter = filterBySearch();
  return (
    <div>
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
      <div className="mt-5 flex justify-center flex-wrap">
        {isSuccess ? (
          filter?.map((post, index) => <PostCart post={post} key={index} />)
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Feed;
