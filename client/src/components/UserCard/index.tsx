interface Props {
  user: {
    name: string;
    status: string;
    imgUrl: string;
  };
}

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex justify-start p-4 pl-5">
      <div className="flex items-center justify-center gap-5">
        <img src={user.imgUrl} alt="User" className="w-[70px] h-[70px]" />
        <p className="line-clamp-1 font-bold">{user.name}</p>
      </div>
    </div>
  );
};

export default UserCard;
