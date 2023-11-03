interface Props {
  chat: {
    name: string;
    message: string;
    imgUrl: string;
  };
}
const ChatCards = ({ chat }: Props) => {
  return (
    <div className="flex flex-1 gap-2 rounded-md hover:bg-bgSlate">
      <img
        src={chat.imgUrl}
        alt="User"
        className="object-contain w-[40px] h-[40px]"
      />
      <div className="flex max-w-[270px] flex-col justify-start">
        <p className="font-bold">{chat.name}</p>
        <p className="line-clamp-1 ">{chat.message}</p>
      </div>
    </div>
  );
};

export default ChatCards;
