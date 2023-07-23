"use client";

import { DebounceInput } from "react-debounce-input";
import { useState } from "react";
import ProfileCart from "./ProfileCart";
const Profile = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold py-4">Discover & Share</h2>
        <h2 className="text-3xl h-ai font-bold my-3">AI-Powered Prompts</h2>
        <p className="text-xl font-semibold px-4 text-center">
          Promptopia is an open-source AI model and programming tool for modern
          world to discove,create and share creative prompts.
        </p>
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
          This is <span className="text-blue-400">Arif 's</span> Profile.
        </h2>
      </div>
      <div className="flex flex-wrap justify-center">
        <ProfileCart />
        <ProfileCart />
        <ProfileCart />
        <ProfileCart />
        <ProfileCart />
      </div>
    </div>
  );
};

export default Profile;
