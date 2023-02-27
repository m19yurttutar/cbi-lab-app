import {
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import LoadingSpinner from "@/components/LoadingSpinner.jsx";
import { PlusIcon } from "@heroicons/react/24/solid/index.js";
import { useMaterialTailwindController } from "@/context/index.jsx";

function IndexTable(props) {
  const { title, headers, renderRows, loading } = props;

  const [controller] = useMaterialTailwindController();
  const { sidenavColor } = controller;

  const renderHeaders = (headers) =>
    headers.map((header, index) => {
      return (
        <th key={index} className="border-b border-blue-gray-50 py-3 px-5">
          <Typography
            variant="small"
            className="text-[11px] font-bold uppercase text-blue-gray-400"
          >
            {header}
          </Typography>
        </th>
      );
    });

  return (
    <Card>
      <CardHeader
        color={sidenavColor}
        className="mb-8 flex items-center justify-between p-5"
      >
        <Typography variant="h6" color="white" className="capitalize">
          {title}
        </Typography>

        <Tooltip
          content="Add New"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
        >
          <IconButton variant="text" color="white" onClick={props.handleModal}>
            <PlusIcon className="h-6 w-6" />
          </IconButton>
        </Tooltip>
      </CardHeader>
      <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto whitespace-nowrap">
          <thead>
            <tr>{renderHeaders(headers)}</tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="text-center">
                <td colSpan="100%" className="pt-4 pb-2">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : renderRows != null ? (
              renderRows
            ) : (
              <tr>
                <td colSpan="100%" className="pt-4 pb-2 text-center">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold text-blue-gray-400"
                  >
                    No Data Found
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

export default IndexTable;
