"use client";
import Image from "next/image";
import { BiHighlight, BiTrash } from "react-icons/bi";

const ProfileCart = () => {
  return (
    <div className="min-w-0 relative  max-w-md px-3 py-3 min-h-0 border-2 shadow-lg border-sky-300/60 rounded-md m-2 bg-red-200/75 opacity-80">
      <div className="flex text-center justify-center">
        <div>
          <Image
            src="https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png"
            alt="user"
            width={40}
            height={40}
            className="rounded-full border-2 border-red-300 opacity-100"
          />
        </div>
        <div>
          <h2 className="font-mono font-bold mr-4">UserName</h2>
          <span className="ml-2">email</span>
        </div>

        <div className="items-end">
          <div className="flex absolute top-2 right-1 ">
            <BiHighlight className="text-green-600 font-bold cursor-pointer text-xl" />
            <BiTrash className="text-red-600 ml-2 font-bold cursor-pointer text-xl" />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <hr className="w-2/3 mt-2 bg-gray-800 border-1" />
      </div>
      <div className="mt-2 text-center">
        <p className="text-gray-600">
          post Promptopia is an open-source AI model and programming tool for
          modern world to discove,create and share creative prompts.
        </p>
        <p className="text-start text-blue-500">#tag</p>
      </div>
    </div>
  );
};

export default ProfileCart;
