import React from "react";
import { User } from "../../types";

interface Props {
  isSender: boolean;
  content: string;
  user: User;
}

const Message = ({ isSender, content, user }: Props) => {
  return (
    <>
      <div className="flex gap-5 items-center rounded-lg p-5">
        <img
          src={user.imgUrl}
          alt="message img"
          className="object-contain w-[40px] h-[40px]"
        />
        <div
          className={`${
            isSender ? "bg-white" : "bg-blue-gray-500"
          } p-2 rounded-lg`}
        >
          <p>{content}</p>
        </div>
      </div>
    </>
  );
};

export default Message;
