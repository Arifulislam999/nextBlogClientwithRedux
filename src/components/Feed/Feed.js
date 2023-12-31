"use client";
import "../../styles/pagination.css";
import { DebounceInput } from "react-debounce-input";
import PostCart from "./PostCart";
import { useEffect, useState } from "react";
import { useGetAllPostQuery } from "@/Redux/Features/Blog/blogApi";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  paginationPage,
  removeSearchText,
} from "@/Redux/Features/Blog/blogSlice";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const Feed = () => {
  const storeData = () => {
    return (
      typeof sessionStorage !== "undefined" &&
      JSON.parse(sessionStorage.getItem("No"))
    );
  };
  let sData = storeData();
  const dispatch = useDispatch();
  const { text, page: rPage } = useSelector((state) => state.text);
  useEffect(() => {
    dispatch(paginationPage(JSON.parse(sessionStorage.getItem("No"))));
  }, []);

  const [currentPage, setCurrentPage] = useState(sData || 1);
  const [searchText, setSearchText] = useState("");

  const { data: postData, isSuccess } = useGetAllPostQuery({
    page: Number(rPage) || 1,
    searchText: searchText,
  });

  useEffect(() => {
    setSearchText(text);
  }, [text]);
  useEffect(() => {
    if (searchText) {
      setCurrentPage(1);
    }
  }, [searchText]);
  // const filterBySearch = () => {
  //   const regex = new RegExp(searchText, "i"); // i for case insensitive search
  //   return postData?.allPost?.filter(
  //     (item) => regex.test(item?.tag) || regex.test(item?.creatorId?.name)
  //   );
  // };

  // const filter = filterBySearch();

  // Pagination handler

  const handlerPageChange = (page) => {
    setCurrentPage(page);
    sessionStorage.setItem("No", JSON.stringify(page));
    dispatch(paginationPage(JSON.parse(sessionStorage.getItem("No"))));
  };

  return (
    <div>
      <div className="relative w-full text-center">
        <DebounceInput
          minLength={3}
          debounceTimeout={500}
          type="search"
          placeholder="Search for a tag or click"
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
          postData?.allPost?.map((post, index) => (
            <PostCart post={post} key={index} />
          ))
        ) : (
          <Loader />
        )}
      </div>
      {/* pagination  */}
      {isSuccess && (
        <div className="page">
          <div className="pagination-container w-fit">
            <ResponsivePagination
              current={currentPage}
              total={Math.ceil(postData?.totalPost / 5)}
              onPageChange={(page) => handlerPageChange(page)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
