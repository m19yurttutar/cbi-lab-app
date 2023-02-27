import React from "react";
import { connect } from "react-redux";
import {
  Avatar,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid/index.js";
import { deleteComment } from "@/actions/commentActions.js";
import onDelete from "@/functions/deleteFunction.js";

function Comment(props) {
  const { comment } = props;

  return (
    <article className="rounded-lg bg-white p-6 text-base dark:bg-gray-900">
      <footer className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar
            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
            alt="avatar"
            size={"xs"}
            variant="circular"
            className="mr-2"
          />
          <Typography
            variant="small"
            color={"blue-gray"}
            className="mr-2 font-black capitalize opacity-75"
          >
            {comment.author}
          </Typography>
          <Typography
            variant="small"
            color={"blue-gray"}
            className="mr-2 font-medium capitalize opacity-75"
          >
            {new Intl.DateTimeFormat("tr-TR", {
              dateStyle: "long",
              timeStyle: "short",
            }).format(new Date(comment.date))}
          </Typography>
        </div>
        <Menu
          placement="bottom-end"
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          <MenuHandler>
            <IconButton variant="text" color="blue-gray">
              <EllipsisHorizontalIcon className="h-6 w-6" />
            </IconButton>
          </MenuHandler>
          <MenuList>
            {/*<MenuItem>*/}
            {/*  <div className="flex items-center gap-2">*/}
            {/*    <PencilIcon className="h-4 w-4" />*/}
            {/*    <Typography className="text-normal font-medium">*/}
            {/*      Edit*/}
            {/*    </Typography>*/}
            {/*  </div>*/}
            {/*</MenuItem>*/}
            <MenuItem onClick={() => onDelete(comment.id, props.deleteComment)}>
              <div className="flex items-center gap-2">
                <TrashIcon className="h-4 w-4" />
                <Typography className="text-normal font-medium">
                  Delete
                </Typography>
              </div>
            </MenuItem>
          </MenuList>
        </Menu>
      </footer>
      <Typography
        variant="paragraph"
        color={"blue-gray"}
        className="font-medium opacity-75"
      >
        {comment.description}
      </Typography>
    </article>
  );
}

export default connect(null, {
  deleteComment,
})(Comment);
