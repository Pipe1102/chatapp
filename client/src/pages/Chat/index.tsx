import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { getConversationById } from "../../api/conversation";
import { User } from "../../types";
import { getUserId, getUserInConversation } from "../../api/user";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Message from "../../components/Message";
const Chat = () => {
  const params = useParams();
  const userId = getUserId();
  const [chatUser, setChatUser] = useState<User>();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const socket = io("http://localhost:5001");

  const { data } = useQuery(
    ["conversation", params.id],
    () => getConversationById(params.id!),
    {
      onSuccess: (res) => {
        const userFromRequest: User = getUserInConversation(res.users);
        setChatUser(userFromRequest);
      },
    }
  );

  useEffect(() => {
    socket.connect();
    socket.emit("join_room", params.id);
    socket.on("messages", (messages) => {
      setMessages(messages);
    });
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleSubmit = () => {
    socket.emit("sendMessage", {
      content: message,
      userId,
      conversationId: params.id,
    });
    setMessage("");
  };

  const isSender = (message: any): boolean => message.userId === userId;

  return (
    <>
      <div className="fixed w-full flex justify-start items-center border shadow-lg p-5 gap-5">
        <img
          src={chatUser?.imgUrl}
          alt="Chat user"
          className="w-[70px] h-[70px] rounded-full object-contain "
        />
        <p>{chatUser?.username}</p>
      </div>
      <div className="flex w-full flex-col shadow-lg mt-[70px]">
        <div className="flex flex-col justify-end mt-auto h-full bg-gray-100">
          {messages.map((message: any) => (
            <div
              className={`flex flex-col ${
                isSender(message) ? "items-start" : "items-end"
              }`}
              key={message.id}
            >
              <Message
                isSender={isSender(message)}
                content={message.content}
                user={message.user}
              />
            </div>
          ))}
        </div>
        <div className="flex w-full mt-auto bg-white">
          <input
            type="text"
            name="text"
            placeholder="Write your message"
            className="w-full border p-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSubmit} className=" border p-2 bg-green-700">
            <FontAwesomeIcon
              className="w-[20px] h-[20px] "
              icon={faPaperPlane}
            />
          </button>
        </div>
      </div>
      {/* <button onClick={handleSubmit} className="rounded p-2 mt-10 bg-blue-500">
        Send message
      </button> */}
    </>
  );
};

export default Chat;
