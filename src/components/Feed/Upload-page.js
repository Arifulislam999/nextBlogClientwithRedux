"use client";

const UploadPage = () => {
  return (
    <form className="w-full md:w-3/4  border-green-800 p-6 rounded-md border-4 bg-gray-900 text-yellow-200/40">
      <h2 className="text-2xl pb-3 font-semibold">Upload Post</h2>
      <div>
        <div className="flex flex-col mb-3">
          <label htmlFor="name">Post</label>
          <input
            type="text"
            id="name"
            className="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-red-500 focus:outline-none focus:bg-gray-800 focus:text-red-500"
            autoComplete="on"
            placeholder="Post"
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            id="tag"
            className="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-red-500 focus:outline-none focus:bg-gray-800 focus:text-red-500"
            autoComplete="on"
            placeholder="#tag"
          />
        </div>
      </div>
      <div className="w-full pt-3">
        <button
          type="submit"
          className="w-full bg-gray-900 border border-red-500 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-red-500 hover:text-white text-xl cursor-pointer"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default UploadPage;
