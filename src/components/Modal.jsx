import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function Modal(props) {
  const { open, handleProductCreateModal } = props;

  return (
    <Dialog
      open={open}
      handler={handleProductCreateModal}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>Its a simple dialog.</DialogHeader>
      <DialogBody>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus ad
        reprehenderit omnis perspiciatis aut odit! Unde architecto perspiciatis,
        dolorum dolorem iure quia saepe autem accusamus eum praesentium magni
        corrupti explicabo!
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleProductCreateModal}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={handleProductCreateModal}
        >
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default Modal;
