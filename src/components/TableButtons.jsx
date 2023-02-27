import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@material-tailwind/react";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid/index.js";
import onDelete from "@/functions/deleteFunction.js";

function TableButtons({ id, deleteFunction, handleModal, details = false }) {
  return (
    <>
      <Tooltip
        content="Delete"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <IconButton
          color="red"
          className="mx-1.5"
          onClick={() => onDelete(id, deleteFunction)}
        >
          <TrashIcon className="h-6 w-6" />
        </IconButton>
      </Tooltip>
      <Tooltip
        content="Edit"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <IconButton color="blue" className="mx-1.5" onClick={handleModal}>
          <PencilSquareIcon className="h-6 w-6" />
        </IconButton>
      </Tooltip>

      {details && (
        <Tooltip
          content="Details"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
        >
          <Link to={`${id}`}>
            <IconButton color="blue-gray" className="mx-1.5">
              <EyeIcon className="h-6 w-6" />
            </IconButton>
          </Link>
        </Tooltip>
      )}
    </>
  );
}

export default TableButtons;
