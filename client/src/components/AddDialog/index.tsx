import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { addConversation } from "../../api/conversation";
import { useState } from "react";
import { useMutation } from "react-query";

interface Props {
  closeDialog: () => void;
  open: boolean;
}
const AddDialog = ({ closeDialog, open }: Props) => {
  const [username, setUsername] = useState("");
  const { mutate } = useMutation(addConversation, {
    onSuccess: (data) => {
      closeDialog();
    },
  });

  const handleAddContact = () => {
    mutate(username);
  };

  return (
    <Dialog
      open={open}
      handler={closeDialog}
      className="flex flex-col justify-center items-center"
    >
      <DialogHeader>Add contact</DialogHeader>
      <DialogBody>
        <div className="w-72">
          <Input
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            crossOrigin={undefined}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={closeDialog}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          onClickCapture={handleAddContact}
          variant="gradient"
          color="green"
          onClick={closeDialog}
        >
          <span>Add</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddDialog;
