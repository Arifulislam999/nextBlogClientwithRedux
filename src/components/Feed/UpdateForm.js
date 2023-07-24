"use client";
import {
  useEditSinglePostMutation,
  useGetSinglePostQuery,
} from "@/Redux/Features/Blog/blogApi";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const UpdateForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const {
    data: singlePost,
    isSuccess,
    isLoading,
    error,
  } = useGetSinglePostQuery({ id });
  const [editSinglePost, { isLoading: updateingLoad }] =
    useEditSinglePostMutation();
  const [post, setPost] = useState("");
  const [tag, setTag] = useState("");
  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      await editSinglePost({ id, data: { post, tag } });
    } catch (error) {
      console.log("can't update single post.");
    } finally {
      router.push("/profile");
    }
  };
  useEffect(() => {
    if (singlePost) {
      setPost(singlePost?.singlePost?.post);
      setTag(singlePost?.singlePost?.tag);
    }
  }, [isSuccess, singlePost]);
  console.log(error);
  return isLoading ? (
    <Loader />
  ) : (
    <form
      onSubmit={handlerSubmit}
      className="w-full md:w-3/4  border-green-800 p-6 rounded-md border-4 bg-gray-900 text-yellow-200/40"
    >
      <h2 className="text-2xl pb-3 font-semibold">Edit Post</h2>
      <div>
        <div className="flex flex-col mb-3">
          <label htmlFor="name">Post</label>
          <input
            type="text"
            id="name"
            className="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-red-500 focus:outline-none focus:bg-gray-800 focus:text-red-500"
            autoComplete="on"
            placeholder="Post"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="tag">Tag (#webdevelopment,#idea,#coading)</label>
          <input
            type="text"
            id="tag"
            className="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-red-500 focus:outline-none focus:bg-gray-800 focus:text-red-500"
            autoComplete="on"
            placeholder="#tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          />
        </div>
      </div>
      {error && (
        <span
          type="submit"
          className="w-full bg-gray-900 border border-red-300 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-red-500 hover:text-white text-xl cursor-pointer"
        >
          {error?.data?.message}
        </span>
      )}
      <div className="w-full pt-3">
        <button
          type="submit"
          className="w-full bg-gray-900 border border-red-500 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-red-500 hover:text-white text-xl cursor-pointer"
        >
          {updateingLoad ? "Updateing Post..." : "Edit Post"}
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
