import React from "react";

const LocalSearch = () => {
  return (
    <div className=" mt-5 flex w-full items-center gap-4 border border-x-0 bg-background p-2">
      <img
        src="/assets/icons/search.svg"
        alt="search icon"
        width={24}
        height={24}
        className="cursor-pointer w-[24px] h-[24px]"
      />
      <input
        type="text"
        className="bg-transparent min-w-[300px] overflow-hidden rounded-md border-none shadow-none outline-none"
        placeholder="Search for contacts..."
      />
    </div>
  );
};

export default LocalSearch;
