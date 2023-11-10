import { Link } from "react-router-dom";
import ChatCards from "../ChatCards";
import LocalSearch from "../LocalSearch";
import SideBarFooter from "../SideBarFooter";
import UserCard from "../UserCard";
import { useQuery } from "react-query";
import { getConversationForUser } from "../../api/conversation";
import { useState } from "react";
import AddDialog from "../AddDialog";

const LeftSideBar = () => {
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversationForUser,
  });

  const getLastMessage = (messages: []): string => {
    const lastMessage: any = messages[messages.length - 1];
    return lastMessage.content;
  };

  return (
    <section className="sticky left-0 top-0 flex h-full flex-col overflow-x-hidden border-r bg-background shadow-md max-md:hidden">
      <UserCard />
      <LocalSearch />
      <div className="mt-5 flex flex-col gap-4 p-4">
        {data !== undefined &&
          data.map((item: any) => (
            <Link key={item.id} to={`/${item.id}`}>
              <ChatCards
                users={item.users}
                message={getLastMessage(item.messages)}
              />
            </Link>
          ))}
      </div>
      <SideBarFooter openDialog={() => setOpen(true)} />
      {open && (
        <AddDialog open={open} closeDialog={() => setOpen((prev) => !prev)} />
      )}
    </section>
  );
};

export default LeftSideBar;
