"use client";

import {
  useGetLogInUserQuery,
  useUpdateUserMutation,
} from "@/Redux/Features/Blog/blogApi";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const router = useRouter();
  const { data: userData, isSuccess, isLoading } = useGetLogInUserQuery();
  const [updateUser] = useUpdateUserMutation();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [bio, setBio] = useState();
  const [file, setFile] = useState();
  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ data: { name, phone, photo: file, bio } });
    } catch (error) {
      console.log("Can not update User Data");
    } finally {
      router.push("/profile");
    }
  };
  useEffect(() => {
    setBio(userData?.bio);
    setName(userData?.name);
    setPhone(userData?.phone);
  }, [userData, isSuccess]);

  return isLoading === true ? (
    <Loader />
  ) : (
    <div>
      <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-xl font-semibold text-center">
                  Update & Edit Your Profile
                </h1>
              </div>
              <form onSubmit={handlerSubmit}>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autoComplete="on"
                        id="name"
                        name="name"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Enter Name"
                        required
                        value={name || ""}
                        onChange={(e) => setName(e?.target.value)}
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Name
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        autoComplete="on"
                        id="email"
                        name="email"
                        type="email"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 bg-gray-200 pl-2 focus:outline-none focus:borer-rose-600"
                        placeholder="Enter Name"
                        required
                        value={userData?.email || ""}
                        disabled
                      />
                      <label
                        htmlFor="phone"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        autoComplete="on"
                        id="phone"
                        name="phone"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Enter Name"
                        required
                        value={phone || ""}
                        onChange={(e) => setPhone(e?.target.value)}
                      />
                      <label
                        htmlFor="phone"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Phone Number
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        autoComplete="on"
                        id="bio"
                        name="bio"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Update Bio..."
                        required
                        value={bio || ""}
                        onChange={(e) => setBio(e?.target.value)}
                      />
                      <label
                        htmlFor="bio"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Bio
                      </label>
                    </div>

                    <div>
                      <label
                        htmlFor="file-upload"
                        className="custom-file-upload"
                      >
                        Upload Your Profile
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        value={file || ""}
                        onChange={(e) => setFile(e?.target.value)}
                      />
                    </div>

                    <div className="relative">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md px-2 py-1"
                      >
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
