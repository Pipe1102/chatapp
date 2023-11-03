import React from "react";

const SideBarFooter = () => {
  return (
    <div className="mt-auto flex w-full ">
      <div className="flex w-full items-center justify-center gap-2  border ">
        <img
          src="/assets/icons/edit.svg"
          alt="add contact"
          width={20}
          height={20}
          className="w-[20px] h-[20px]"
        />
        <button className="border-none" />
      </div>
      <div className="flex w-full items-center justify-center gap-2  border border-l-0 p-1">
        <img
          src="/assets/icons/account.svg"
          alt="add contact"
          className="w-[20px] h-[20px]"
        />
        <button className="border-none" />
      </div>
    </div>
  );
};

export default SideBarFooter;
