import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { connect } from "react-redux";

import {
  getSpecifications,
  deleteSpecification,
} from "@/actions/specificationActions.js";
import { clearData } from "@/actions/globalActions.js";

import IndexTable from "@/components/IndexTable.jsx";
import TableButtons from "@/components/TableButtons.jsx";

import SpecificationForm from "@/components/specification/SpecificationForm";

function SpecificationIndex(props) {
  const { specifications, loading } = props;

  const initialSpecificationModal = { open: false, specification: null };

  const [specificationModal, setSpecificationModal] = useState(
    initialSpecificationModal
  );

  const handleSpecificationModal = (specification) => {
    specificationModal.open
      ? setSpecificationModal(initialSpecificationModal)
      : setSpecificationModal({ open: true, specification: specification });
  };

  useEffect(() => {
    props.getSpecifications();

    return () => props.clearData();
  }, []);

  const renderRows = () => {
    return specifications.map((specification, index) => {
      const className = `py-3 px-5 text-center ${
        index === specifications.length - 1
          ? ""
          : "border-b border-blue-gray-50"
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
              {specification.name}
            </Typography>
          </td>
          <td className={className}>
            <TableButtons
              id={specification.id}
              deleteFunction={props.deleteSpecification}
              handleModal={() => handleSpecificationModal(specification)}
            />
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {specificationModal.open && (
        <SpecificationForm
          specificationModal={specificationModal}
          handleSpecificationModal={() => handleSpecificationModal(null)}
        />
      )}

      <IndexTable
        title="specification table"
        headers={["#", "specification name", ""]}
        renderRows={specifications.length > 0 ? renderRows() : null}
        handleModal={() => handleSpecificationModal(null)}
        loading={loading}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  const {
    specification: { specifications, getSpecificationsLoading },
  } = state;

  return { specifications, loading: getSpecificationsLoading };
};

export default connect(mapStateToProps, {
  getSpecifications,
  deleteSpecification,
  clearData,
})(SpecificationIndex);
