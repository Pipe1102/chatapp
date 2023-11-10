import React from "react";
import { faCog, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  openDialog: () => void;
}
const SideBarFooter = ({ openDialog }: Props) => {
  return (
    <div className="mt-auto flex w-full ">
      <div className="flex w-full items-center justify-center gap-2 border">
        <button
          className="border-none"
          onClick={() => {
            openDialog();
          }}
        >
          <FontAwesomeIcon
            className="w-[20px] h-[20px] text-green-700"
            icon={faPlus}
          />
        </button>
      </div>
      <div className="flex w-full items-center justify-center gap-2  border border-l-0 p-1">
        <FontAwesomeIcon
          className="w-[20px] h-[20px] text-green-700"
          icon={faCog}
        />
        <button className="border-none" />
      </div>
    </div>
  );
};

export default SideBarFooter;
