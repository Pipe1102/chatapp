import ChatCards from "../ChatCards";
import LocalSearch from "../LocalSearch";
import SideBarFooter from "../SideBarFooter";
import UserCard from "../UserCard";

const loggedInUser = {
  name: "Filip Jovanovic",
  imgUrl: "/assets/userImage.png",
  status: "online",
};

const chats = [
  {
    id: 1,
    name: "Luis Litt",
    message: "You just got LITT up Mike",
    imgUrl: "/assets/userImage.png",
  },
  {
    id: 2,
    name: "Harvey Specter",
    message: "Wrong. You take the gun, or put it on your forhead",
    imgUrl: "/assets/userImage.png",
  },
  {
    id: 3,
    name: "Rachel Zane",
    message: "I was thinkig that we could have our own child once.",
    imgUrl: "/assets/userImage.png",
  },
  {
    id: 4,
    name: "Donna Paulsen",
    message: "Mike I know everything. I'm Donna after all.",
    imgUrl: "/assets/userImage.png",
  },
  {
    id: 5,
    name: "Jessica Pearson",
    message: "Have you finished the draft on Hogwarts Legacy?",
    imgUrl: "/assets/userImage.png",
  },
  {
    id: 6,
    name: "Harold Gunderson",
    message: "Thanks Mike! :)",
    imgUrl: "/assets/userImage.png",
  },
  {
    id: 7,
    name: "Daniel Hardman",
    message: "I have something to tell you Mike",
    imgUrl: "/assets/userImage.png",
  },
];

const LeftSideBar = () => {
  return (
    <section className="sticky left-0 top-0 flex  h-screen flex-col overflow-y-auto border-r bg-background shadow-md max-md:hidden">
      <UserCard user={loggedInUser} />
      <LocalSearch />
      <div className="mt-5 flex flex-col gap-4 p-4">
        {chats.map((item: any) => (
          <ChatCards key={item.name} chat={item} />
        ))}
      </div>
      <SideBarFooter />
    </section>
  );
};

export default LeftSideBar;
