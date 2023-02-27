import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { connect } from "react-redux";

import { getBoxes, deleteBox } from "@/actions/boxActions.js";
import { clearData } from "@/actions/globalActions.js";

import IndexTable from "@/components/IndexTable.jsx";
import TableButtons from "@/components/TableButtons.jsx";

import BoxForm from "@/components/box/BoxForm";

function BoxIndex(props) {
  const { boxes, loading } = props;

  const initialBoxModal = { open: false, box: null };

  const [boxModal, setBoxModal] = useState(initialBoxModal);

  const handleBoxModal = (box) => {
    boxModal.open
      ? setBoxModal(initialBoxModal)
      : setBoxModal({ open: true, box: box });
  };

  useEffect(() => {
    props.getBoxes();

    return () => props.clearData();
  }, []);

  const renderRows = () => {
    return boxes.map((box, index) => {
      const className = `py-3 px-5 text-center ${
        index === boxes.length - 1 ? "" : "border-b border-blue-gray-50"
      }`;

      return (
        <tr key={index}>
          <td className={className}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold"
            >
              {index + 1}
            </Typography>
          </td>
          <td className={className}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold"
            >
              {box.name}
            </Typography>
          </td>
          <td className={className}>
            <TableButtons
              id={box.id}
              deleteFunction={props.deleteBox}
              handleModal={() => handleBoxModal(box)}
            />
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {boxModal.open && (
        <BoxForm
          boxModal={boxModal}
          handleBoxModal={() => handleBoxModal(null)}
        />
      )}

      <IndexTable
        title="box table"
        headers={["#", "box name", ""]}
        renderRows={boxes.length > 0 ? renderRows() : null}
        handleModal={() => handleBoxModal(null)}
        loading={loading}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const {
    box: { boxes, getBoxesLoading },
  } = state;

  return { boxes, loading: getBoxesLoading };
};

export default connect(mapStateToProps, {
  getBoxes,
  deleteBox,
  clearData,
})(BoxIndex);
