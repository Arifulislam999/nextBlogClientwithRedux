"use client";
import { Rings } from "react-loader-spinner";
import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      <Rings
        height="130"
        width="130"
        color="#798bee"
        radius="10"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
};

export default Loader;
