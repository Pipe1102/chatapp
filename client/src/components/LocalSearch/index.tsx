import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const LocalSearch = () => {
  return (
    <div className=" mt-5 flex w-full items-center gap-4 border border-x-0 bg-background p-2">
      <FontAwesomeIcon
        className="w-[20px] h-[20px] text-green-700"
        icon={faSearch}
      />
      <input
        type="text"
        className="bg-transparent min-w-[300px]  overflow-hidden rounded-md border-none shadow-none outline-none"
        placeholder="Search for contacts..."
      />
    </div>
  );
};

export default LocalSearch;
