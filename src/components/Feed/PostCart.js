"use client";

import { useGetMyUserIdQuery } from "@/Redux/Features/Blog/blogApi";
import { searchText } from "@/Redux/Features/Blog/blogSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const PostCart = ({ post }) => {
  const dispatch = useDispatch();
  const { data: userId } = useGetMyUserIdQuery();
  const router = useRouter();
  const { post: userPost, tag, creatorId } = post || {};
  const { name, email, _id } = creatorId || {};
  const handlerUser = (id) => {
    if (userId?.userId === id) {
      router.push("/profile");
    } else {
      router.push(`/singleuserquery?id=${id}`);
    }
  };
  const handlerName = (clickText) => {
    dispatch(searchText(clickText));
  };
  return (
    <div className="min-w-0 max-w-md px-3 py-3 min-h-0 max-h-96 border-2 shadow-lg border-sky-300/60 rounded-md m-2 bg-red-200/75 opacity-80 ">
      <div className="flex text-center justify-center">
        <div>
          <Image
            onClick={() => handlerUser(_id)}
            src={
              post?.photo ||
              "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
            }
            alt="user"
            width={40}
            height={40}
            className="rounded-full border-2 cursor-pointer border-red-300 opacity-100"
          />
        </div>
        <div>
          <h2 className="font-mono font-bold ">
            <span
              className="cursor-pointer text-gray-500 capitalize"
              onClick={() => handlerName(name)}
            >
              {name}
            </span>
          </h2>
          <span className="ml-2">{email}</span>
        </div>
      </div>
      <div className="flex justify-center">
        <hr className="w-2/3 mt-2 bg-gray-800 border-1" />
      </div>
      <div className="mt-2 ">
        <p className="text-gray-600 max-h-32 overflow-y-scroll capitalize">
          {userPost}
        </p>
        <p className="text-start text-blue-500 ">
          <span className="cursor-pointer capitalize">#{tag}</span>
        </p>
      </div>
    </div>
  );
};

export default PostCart;
