import { useState } from "react";
import { fileToBase64 } from "../../util";
import { RegisterUser, register } from "../../api/user";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const { mutate } = useMutation(register, {
    onSuccess: (res) => {
      setUsername("");
      setPassword("");
      setImgUrl("");
      alert("Successfully registered");
    },
  });

  const buttonDisabled: boolean =
    username === "" || password === "" || imgUrl === "";

  const handleRegister = () => {
    const user: RegisterUser = { username, password, imgUrl };
    mutate(user);
  };

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempFileList: { fileName: string; base64String: string }[] = [];
    await Promise.all(
      [].map.call(e.target.files, async (file: File) => {
        tempFileList.push({
          fileName: file.name,
          base64String:
            file.type.indexOf("image") > -1 ? await fileToBase64(file) : "",
        });
      })
    );
    setImgUrl(tempFileList[0].base64String);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="min-w-[600px] flex flex-col gap-10 justify-center items-center p-5 shadow-xl rounded">
        <h1 className="font-bold text-[24px] line-clamp-1">Register Form</h1>
        <input
          type="text"
          className="rounded border w-full p-2"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="rounded border w-full p-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-4 w-full items-center">
          <p>Image:</p>
          <input
            className="block w-full text-sm p-2 text-gray-900 border  border-gray-300 rounded-lg cursor-pointer  focus:outline-none"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            required
            onChange={onSelectFile}
          />
        </div>
        <button
          onClick={handleRegister}
          disabled={buttonDisabled}
          className="border rounded-lg p-2 min-w-[100px] bg-blue-600 hover:bg-blue-900 disabled:bg-gray-600"
        >
          <p className="text-white">Register</p>
        </button>
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default Register;
