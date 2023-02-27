import React from "react";
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  EllipsisHorizontalIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/solid/index.js";
import onDelete from "@/functions/deleteFunction.js";
import { connect } from "react-redux";
import { deleteProductSpecification } from "@/actions/productSpecificationActions.js";
function Specification(props) {
  const { productSpec, handleProductSpecModal } = props;

  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex items-center justify-between">
        <div className="font-medium text-gray-900">{productSpec.spec.name}</div>
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
            <MenuItem onClick={() => handleProductSpecModal(productSpec)}>
              <div className="flex items-center gap-2">
                <PencilIcon className="h-4 w-4" />
                <Typography className="text-normal font-medium">
                  Edit
                </Typography>
              </div>
            </MenuItem>
            <MenuItem
              onClick={() =>
                onDelete(productSpec.id, props.deleteProductSpecification)
              }
            >
              <div className="flex items-center gap-2">
                <TrashIcon className="h-4 w-4" />
                <Typography className="text-normal font-medium">
                  Delete
                </Typography>
              </div>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>

      <div className="mt-2 text-sm text-gray-500">{productSpec.specValue}</div>
    </div>
  );
}

export default connect(null, {
  deleteProductSpecification,
})(Specification);
