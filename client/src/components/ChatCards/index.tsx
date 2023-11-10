import { useEffect, useState } from "react";
import { getUserInConversation } from "../../api/user";
import { User } from "../../types";

interface Props {
  users: User[];
  message: string;
}
const ChatCards = ({ users, message }: Props) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (users) {
      setUser(getUserInConversation(users));
    }
  }, [users]);

  return (
    <div className="flex flex-1 gap-2 rounded-full hover:bg-bgSlate">
      <img
        src={user?.imgUrl}
        alt="User"
        className="object-contain w-[50px] h-[50px] "
      />
      <div className="flex max-w-[270px] flex-col justify-start">
        <p className="font-bold">{user?.username}</p>
        <p className="line-clamp-1">{message}</p>
      </div>
    </div>
  );
};

export default ChatCards;
