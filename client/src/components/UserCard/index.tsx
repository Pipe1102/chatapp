import { useQuery } from "react-query";
import { getUser } from "../../api/user";

const UserCard = () => {
  const { data: user } = useQuery({ queryKey: ["getUser"], queryFn: getUser });

  return (
    <div className="flex justify-start p-4 pl-5">
      <div className="flex items-center justify-center gap-5">
        <img
          src={user?.imgUrl}
          alt="User"
          className="w-[70px] h-[70px] object-contain border rounded-full"
        />
        <p className="line-clamp-1 font-bold">{user?.username}</p>
      </div>
    </div>
  );
};

export default UserCard;
